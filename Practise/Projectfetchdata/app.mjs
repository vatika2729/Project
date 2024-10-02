import puppeteer from "puppeteer";
import fs from "fs";

async function main() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.otipy.com/category/vegetables-1');

    const data = await page.evaluate(() => {
        const elements = document.querySelectorAll('.style_card_info__xGm58');

        const data = [];
        elements.forEach((e) => {
            const name = element.querySelector('.style_prod_name__QllSp').textContent;
            const price = element.querySelector('.style_final_price__FERLK').textContent;
            const qty = element.querySelector('.style_prod_qt__cXcqe').textContent;
            data.push({
                name,
                price,
                qty
            });
        })
        return data;


    })
    // Close the browser
    await browser.close();

    // Convert the data to JSON
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile('data.json', jsonData, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data written to data.json');
        }
    });

}