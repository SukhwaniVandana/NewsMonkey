import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, date, author, source } = this.props;
        return (
            <div>
                <div className="card">
                    <span className="position-absolute end-0  badge rounded-pill bg-danger" style={{backgroundColor:"#867A6D !important" }}>{source}</span>
                    <img src={imageUrl ? imageUrl : "altnewsimage.png"} className="card-img-top" alt="..." style={{ height: imageUrl ? "auto" : "160px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-344text" style={{ height: description ? "auto" : "75px" }}>{description}</p>
                        <p className="card-text"><small className="text-muted" style={{ fontSize: ".75em" }}>By {author ? author : "Unknown"} at {new Date(date).toUTCString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem