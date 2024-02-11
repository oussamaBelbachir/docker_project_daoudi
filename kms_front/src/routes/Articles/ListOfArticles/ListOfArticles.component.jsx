import React,{Fragment, useEffect,useState} from 'react'
import "./ListOfArticles.styles.scss";
import {getAllArticles} from "../../../Api/articles";
import Loading from '../../../components/Loading/Loading.component';
import ArticleItem from '../../../components/ArticleItem/ArticleItem.component';
import Pagination from '@mui/material/Pagination';
import { useParams } from 'react-router-dom';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound.component';
import { useSearchParams } from "react-router-dom";
// import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs.component';


function ListOfArticles() {

    const {direction,department} = useParams();
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [nbrOfPages,setNbrOfPages] = useState(null);
    let [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (event, value) => {
        setPage(value);
        const obj = {};
        const values = searchParams.entries()
        for (const [key, value] of values) {
            obj[key]=value;
        }
        obj["page"] = value;
        setSearchParams(obj);
    }


    const search = searchParams.get('search');

    useEffect(() => {
        document.title = "Liste des articles";
      }, []);

    useEffect(() => {
        setLoading(true);
        const search_page = searchParams.get("page");
        
        if(search_page) setPage(parseInt(search_page));
        else setPage(1);

        (async () => {
            try{
                const {data : res} = await getAllArticles(direction,department,window.location.search);
                setArticles(res.data.articles);
                console.log(res.data.articles);
                setNbrOfPages(res.nbrOfPages);
            }catch(err){
                console.log("Err ====> ",err);
            }

            setLoading(false);
            
        })();
    },[direction,department,window.location.search]);


    if(loading) return <Loading />
    
  return (
    <div className='list__of__articles'>

        {/* <Breadcrumbs /> */}
        {/* <div className='filtering'>filtering...</div> */}
        {
            articles.length === 0  ? (<NoResultsFound />) : (
                <Fragment>
                    <div className='articles'>
                            {
                                articles.map(item => <ArticleItem key={item._id} article={item} search={search}/>)
                            }
                    </div>

                    <div className='pagination'>
                        <Pagination 
                            page={page} 
                            onChange={handleChange}
                            count={nbrOfPages} 
                            color="primary"
                            />
                    </div>                
                </Fragment>
            )
        }
    </div>
  )
}

export default ListOfArticles