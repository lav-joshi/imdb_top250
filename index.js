const request  = require("request-promise");
const cheerio = require("cheerio");

const movie = "https://www.imdb.com/chart/top?sort=ir%2Cdesc&mode=simple&page=1";

const movies = async ()=>{
    let imdbData = [];
    const response = await request({
        uri:movie,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip:true,
    });

    
    let $ = cheerio.load(response);

    for(let i=0;i<250;i++){

       let nameofMovie = $(`#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(${i+1}) > td.titleColumn>a`).text().trim();
       let year = $(`#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(${i+1}) > td.titleColumn > span`).text().trim();
       let rating =$(`#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(${i+1}) > td.ratingColumn.imdbRating > strong `).text();
       let movieimage = $(`#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(${i+1}) > td.posterColumn > a > img`).attr("src");
    //    let url = $(`#main > div > span > div > div > div.lister > table > tbody > tr:nth-child(${i+1}) > td.posterColumn > a`).attr("href");

    //    url="https://www.imdb.com/"+url;
    //    let plot_summary = await summary(url);
       imdbData.push({
           nameofMovie,year,rating,movieimage
       });

    }
    
   return imdbData;
} 


const summary = async (url)=>{
    const response = await request({
        uri:url,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip:true,
    });

    let $ = cheerio.load(response);
    const idea = $(`#title-overview-widget > div.plot_summary_wrapper.localized > div.plot_summary > div.summary_text`).text().trim();
    console.log(idea);
    return idea;
}
module.exports = movies;