import React, { Component } from 'react';

export default class NewsItem extends Component {

    static defaultProps = {
        imageUrl : 'https://images.hindustantimes.com/tech/img/2023/01/05/960x540/Samsung_Galaxy_A14_5G_1672889924525_1672889938166_1672889938166.jpg'
    }
    
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        );
    }
}

// e61f3019056144aba987bd83f4b3cd06