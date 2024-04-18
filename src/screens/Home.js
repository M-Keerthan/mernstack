import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

function Home() {
    const [foodCat, setFoodCat] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search,setSearch]=useState(" ")

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setFoodItems(data[0]);
            setFoodCat(data[1]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div style={{backgroundColor: "black"}}>
                <Navbar />
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"conatin !important"}}>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{zIndex:"10"}}>
                        <div className="d-flex content-justify-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            //
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{filter:"brightness(50%"}} alt="Burger" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100" style={{filter:"brightness(50%"}} alt="Pastry" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?barbeque" className="d-block w-100"  style={{filter:"brightness(50%"}} alt="Barbeque" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
                <div className='container'>
                    {
                        foodCat.length !== 0 ? (
                            foodCat.map((category) => (
                                <div key={category._id} className='row mb-3'>
                                    <div className='fs-1 m-3'>{category.CategoryName}</div>
                                    <hr/>
                                    {
                                        foodItems.length !== 0 ? (
                                            foodItems
                                                .filter((item) =>(item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map((filteredItem) => (
                                                    <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3 m-3'>
                                                        <Card foodItems={filteredItem}
                                                        options={filteredItem.options[0]}
                                                        ></Card>
                                                    </div>
                                                ))
                                        ) : <div>No items</div>
                                    }
                                </div>
                            ))
                        ) : <div></div>
                    }
                </div>
                
                <Footer />
            </div>
        </>
    );
}

export default Home;
