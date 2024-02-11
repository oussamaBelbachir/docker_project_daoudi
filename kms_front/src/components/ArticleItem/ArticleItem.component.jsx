import React from 'react'
import "./ArticleItem.styles.scss";
import moment from "moment";
import {Link} from "react-router-dom";
import parse from 'html-react-parser';

function ArticleItem({article,search}) {

    const {_id,title,createdAt,direction,department,description,image} = article;
    
    const formatDescription = () => {
        if(!description) return "Lorem ipsum dolor sit amet. Quo iure sapiente est nesciunt voluptatem ut nihil facere et dolorum galisum est vitae odit et rerum c...";
        let desc = description;
        desc = desc.replaceAll(search,`<span className='search'>${search}</span>`)
        return parse(desc.split("").slice(0,130).join("") + "...");
    }

    const link = `/articles/${_id}`;

    const default__img = 'https://miro.medium.com/v2/resize:fill:400:268/1*jyZQjnQAlcoeNCQ8oBkujA.jpeg';
    const server__host = import.meta.env.VITE_SERVER_HOST;
    return (
    <Link to={link}>
        <div className='article_item'>
                <div className='article_infos'>
                    <div className='date'>posté le {moment(createdAt).format("YYYY/MM/DD kk:mm:ss")}</div>
                    <h2 className='title'>{title}</h2>
                    <div className='description'>{formatDescription()}</div>
                    <div className='tags'>
                        <div className='item'># {direction} # {department}</div>
                    </div>
                </div>
                <div className='article_image'>
                    
                    <img alt='article_image' src={image ? `${server__host}${image}` : default__img}/>
                </div>

        </div>
    </Link>
  )
}

export default ArticleItem