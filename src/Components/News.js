import React, { useState, useEffect, useRef } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
const News = (props) => {
    // static defautProps = {
    //     country: "in",
    //     apiKey: "9abe5b938dc848e0b51815f67816cb57",
    //     pageSize: 20,
    //     language: "en"
    // }
    // static propTypes = {
    //     country: PropTypes.string,
    //     apiKey: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     language: PropTypes.string
    // }
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const dataFetchedRef = useRef(false)
    //articles = []
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: articles,
    //         loading: true,
    //         page: 1
    //     }
    //     document.title = this.capitalize(props.category) + " - NewsMonkey";
    // }
    const updateNews = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&language=${props.language}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    // async updateNews() {
    //     props.setProgress(0);
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&language=${props.language}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
    //     this.setState({
    //         loading: true
    //     })
    //     let data = await fetch(url);
    //     props.setProgress(30);
    //     let parsedData = await data.json();
    //     props.setProgress(70);
    //     console.log(parsedData);
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     });
    // }
    const capitalize = (word) => {
        let lower = word.toLowerCase();
        return lower[0].toUpperCase() + lower.slice(1);
    }
    useEffect(() => {
        document.title = capitalize(props.category) + " - NewsMonkey";
        if (dataFetchedRef.current) return
        updateNews()
        dataFetchedRef.current = true
        console.log("useeffect functn call")
    }, [])

    // async componentDidMount() {
    //     this.updateNews();
    // }
    // handlePrevClick = async () => {
    //     this.setState({ page: page - 1 });
    //     this.updateNews();
    // }
    // handleNextClick = async () => {
    //     this.setState({ page: page + 1 });
    //     this.updateNews();
    // }
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&language=${props.language}&page=${page + 1}&pageSize=${props.pageSize}&category=${props.category}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }
    // fetchMoreData = async () => {
    //     this.setState({ page: page + 1 });
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&language=${props.language}&page=${page}&pageSize=${props.pageSize}&category=${props.category}`;
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: this.state.articles.concat(parsedData.articles),
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     });
    // }
    return (
        <>
            <h3 className='text-center' style={{ color: "#867A6D", textDecoration: "underline",marginTop:"70px" }}>News Monkey-Top {capitalize(props.category)} Headlines</h3>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container my-3'>
                    {loading && <Spinner />}
                    {/* {!this.state.loading && */}
                    {<div className="row my-3">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem title={element.title.slice(0, 45) + "..."} description={element.description?.slice(0, 88).concat("...")} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    }
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between mb-4">
                    <button disabled={page === 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )

}
News.defautProps = {
    country: "in",
    apiKey: "9abe5b938dc848e0b51815f67816cb57",
    pageSize: 20,
    language: "en"
}
News.propTypes = {
    country: PropTypes.string,
    apiKey: PropTypes.string,
    pageSize: PropTypes.number,
    language: PropTypes.string
}

export default News