import React, { useState, useEffect } from 'react'

const Body1 = () => {

    const [page_no, setPage_no] = useState(1)

    const [data, setData] = useState([]);

    let incPage_no = () =>{
        if(page_no<6){
            setPage_no(page_no + 1)
        }
    }

    let decPage_no = () =>{
        if(page_no>1){
            setPage_no(page_no - 1)
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/data?page=${page_no}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            })
        

    }, [page_no])

    return (
        <div className='body-container'>
            {/* <div className="coloum1 coloums">ID</div>
            <div className="coloum2 coloums">Title</div>
            <div className="coloum3 coloums">Description</div>
            <div className="coloum4 coloums">Price</div>
            <div className="coloum5 coloums">Category</div>
            <div className="coloum6 coloums">Sold</div>
            <div className="coloum7 coloums">Image</div>
            <div className="coloum8 coloums">Date of Sale</div> */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th className='image'>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => {
                            const { id, title, price, description, category, image, sold, dateOfSale } = item;

                            return (
                                <tr className='table_row ' key={id}>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{description}</td>
                                    <td>{price}</td>
                                    <td>{category}</td>
                                    <td>{sold ? "true" : "false"}</td>
                                    <td><img src={image} alt="alr" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>


            <div className='footer'>
                <p>Page No:{page_no}</p>
                <div>
                    <button className='footer-btn' onClick={decPage_no}>Previous</button>
                    <button className='footer-btn' onClick={incPage_no}>Next</button>
                </div>
                <p>Per Page:10</p>
            </div>


        </div>
    )
}

export default Body1;