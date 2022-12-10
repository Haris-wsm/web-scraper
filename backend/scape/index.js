const puppeteer = require("puppeteer");
const { createProducts, resetALl } = require("../sql");
const { Cluster } = require("puppeteer-cluster");

exports.scrape = async () => {
  await resetALl();
  const browser = await puppeteer.launch({ headless: false });

  try {
    const page = await createPage(browser);
    const elements = await getDOMElement(page);
    const categories = await getCategoriesInfo(elements);
    await browser.close();

    await cluserJobs(categories);
  } catch (error) {
    console.log(error);
  }
};

async function cluserJobs(categories) {
  const cluster = await createCluster();
  await cluster.task(async ({ page, data: { link, name } }) => {
    await page.goto(link);
    await getItems(page, name);
  });

  for (const categorie of categories) {
    await cluster.queue({ link: categorie.link, name: categorie.name });
  }

  await cluster.idle();
  await cluster.close();
}

async function createCluster() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
    monitor: true,
    puppeteerOptions: {
      headless: true,
      defaultViewport: false,
      userDataDir: "./tmp",
    },
  });

  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  return cluster;
}

async function getItems(page, category) {
  try {
    await page.waitForSelector(".item:nth-child(1)");

    const items = await page.evaluate((category) => {
      const PRODUCTS_SELECTOR = ".product-content.product-content-font";
      const IMAGE_SELECTOR = "a .product-image img:nth-child(1)";
      const NAME_SELECTOR = "a .product-name.product-name-font";
      const SPEC_SELECTOR = ".item-spec.item-spec-font.sss";
      const PRICE_SELECTOR = ".price-to-cart .sale.sale-font";
      const ONLINE_PRICE_SELECTOR = ".online-save.online-save-font";

      return Array.from(document.querySelectorAll(PRODUCTS_SELECTOR)).map(
        (element) => {
          const image = element.querySelector(IMAGE_SELECTOR).src;
          const productName = element.querySelector(NAME_SELECTOR).innerText;
          const spec = element.querySelector(SPEC_SELECTOR).innerText;
          const price = element
            .querySelector(PRICE_SELECTOR)
            ?.innerText.replace(/\..+/, "");

          const discount = element
            .querySelector(ONLINE_PRICE_SELECTOR)
            ?.innerText.trim()
            .replace(/[^\w\s]/gi, "")
            .trim();

          // return { product_name: productName, image, spec, price, discount };
          return [productName, image, spec, price, discount, category];
        }
      );
    }, category);

    await createProducts(items);
  } catch (error) {
    console.log(error);
  }
}

async function getCategoriesInfo(elements) {
  const products = [];
  for (const element of elements) {
    const data = await getCategory(element);
    products.push(data);
  }

  return products;
}

async function getCategory(element) {
  return await element.$eval("a", (anchor) => ({
    name: anchor.innerText,
    link: anchor.getAttribute("href"),
  }));
}

async function createPage(browser) {
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  await page.goto("https://www.advice.co.th/", {
    waitUntil: "load",
    timeout: 0,
  });

  return page;
}

async function getDOMElement(page) {
  const NAV_ITME_CATEGORY_LIST_SELECTOR =
    "#primary_nav_wrap > ul.categort-list > li.sub_cate";
  return await page.$$(NAV_ITME_CATEGORY_LIST_SELECTOR);
}
