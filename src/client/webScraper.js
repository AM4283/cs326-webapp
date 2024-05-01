import puppeteer from 'puppeteer';


const siteSearchInfo = [{url: "https://www.walmart.com/search?q=", storeName: "Walmart", elements: []},
{url:"https://cottonon.com/US/co/?lang=en_US&q=", storeName: "COTTON ON", elements: []},
{url:"https://oldnavy.gap.com/browse/search.do?searchText=", storeName: "Old Navy", elements: []}, 
{url:"https://thecommense.com/search?type=product&q=", storeName: "Commense", elements: []},
{url:"https://www.freepeople.com/search?q=", storeName: "Free People", elements:[]}, 
{url:"https://bananarepublic.gap.com/browse/search.do?searchText=", storeName: "Banana Republic", elements: []},
{url:"https://www.pacsun.com/search?q=", storeName: "PacSun", elements: []},
{url:"https://www.urbanoutfitters.com/search?q=", storeName: "Urban Outfitters", elements:[]},
{url:"https://www.amazon.com/s?k", storeName:"Amazon", elements:[]},
{url:"https://www.nordstrom.com/sr?origin=keywordsearch&keyword=", storeName:"Nordstrom", elements:[]}]

export async function scrapeWeb(input){
    const processedInput = processInput(input)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await browser.close()

}

function processInput(input){
    //removes all characters that are not a-z A-Z
    //replaces all spaces with + signs
}