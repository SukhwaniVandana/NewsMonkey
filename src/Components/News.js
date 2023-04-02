import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defautProps = {
        country: "in",
        apiKey: "9abe5b938dc848e0b51815f67816cb57",
        pageSize: 20,
        language: "en"
    }
    static propTypes = {
        country: PropTypes.string,
        apiKey: PropTypes.string,
        pageSize: PropTypes.number,
        language: PropTypes.string
    }
    articles = [
        {
            "source": {
                "id": "bbc-sport",
                "name": "BBC Sport"
            },
            "author": null,
            "title": "Cricket Scotland chairman quits after row over tackling racism",
            "description": "BBC Scotland understands Anjan Luthra is stepping down following a controversy about the progress being made.",
            "url": "http://www.bbc.co.uk/news/uk-scotland-65136207",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/9CBB/production/_129232104_anjan-standing-1-cropped.png",
            "publishedAt": "2023-03-31T10:22:21.4435331Z",
            "content": "The chairman of Cricket Scotland has stepped down, five months after taking up the role and promising to clean up the sport's problem with racism. \r\nBBC Scotland understands Anjan Luthra has decided … [+1921 chars]"
        },
        {
            "source": {
                "id": "google-news-uk",
                "name": "Google News (UK)"
            },
            "author": "Sky News",
            "title": "Former England cricket captain Michael Vaughan cleared of racism charge - Sky News",
            "description": null,
            "url": "https://news.google.com/rss/articles/CBMihAFodHRwczovL25ld3Muc2t5LmNvbS9zdG9yeS9mb3JtZXItZW5nbGFuZC1jcmlja2V0LWNhcHRhaW4tbWljaGFlbC12YXVnaGFuLXNheXMtcmFjaXNtLWNoYXJnZS1hZ2FpbnN0LWhpbS1oYXMtYmVlbi1kaXNtaXNzZWQtMTI4NDU2ODXSAQA?oc=5",
            "urlToImage": null,
            "publishedAt": "2023-03-31T09:19:35+00:00",
            "content": null
        },
        {
            "source": {
                "id": "techcrunch",
                "name": "TechCrunch"
            },
            "author": "Manish Singh",
            "title": "Ambani bats for cricket glory as Disney scales back in India",
            "description": "Reliance's Jio, which has heavily poached talent from Disney's Hotstar, is counting on the IPL cricket tournament to make a dent in streaming.",
            "url": "https://techcrunch.com/2023/03/31/ambani-bats-for-cricket-glory-as-disney-scales-back/",
            "urlToImage": "https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-142507970.jpg?resize=1200,701",
            "publishedAt": "2023-03-31T08:21:52Z",
            "content": "Mukesh Ambani’s Jio, the South Asian telecom powerhouse, has long sought to entice its customer base with a plethora of services aimed at boosting subscriber retention. Despite amassing over 425 mill… [+4123 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
        document.title =  this.capitalize(this.props.category) + " - NewsMonkey";
    }
    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apiKey}&language=${this.props.language}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower[0].toUpperCase() + lower.slice(1);
    }
    async componentDidMount() {
        this.updateNews();
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    render() {
        return (
            <>
                <div className='container my-3'>
                    <h3 className='text-center' style={{ color: "#867A6D", textDecoration: "underline" }}>News Monkey-Top {this.capitalize(this.props.category)} Headlines</h3>
                    {this.state.loading && <Spinner />}
                    {!this.state.loading &&
                        <div className="row my-3">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title.slice(0, 45) + "..."} description={element.description?.slice(0, 88).concat("...")} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    }
                </div>
                <div className="container d-flex justify-content-between mb-4">
                    <button disabled={this.state.page === 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News