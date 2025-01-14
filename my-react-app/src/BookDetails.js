import React from 'react';

const BookDetails = () => {
    const donate = () => {
        const amount = document.getElementById('amount').value;
        const phone = document.getElementById('phone').value;

        if (!amount || !phone) {
            alert('Please enter both amount and phone number.');
            return;
        }

        fetch('http://localhost:3000/stkpush', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, phone })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    };

    return (
        <div>
            <header>
                <div className="container">
                    <h1>Haven-Spa</h1>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/book-appointment">Book Now</a></li>
                            <li><a href="/blogs">Blogs</a></li>
                            <li><a href="/contacts">Contacts</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <div className="container d-flex justify-content-center">
                <div className="card mt-5 px-3 py-4">
                    <div className="d-flex flex-row justify-content-around">
                        <div className="mpesa"><span>Mpesa</span></div>
                        <div><span>Paypal</span></div>
                        <div><span>Card</span></div>
                    </div>
                    <div className="media mt-4 pl-2">
                        <img src="img/mpesa.png" className="mr-3" height="75" alt="Mpesa" />
                        <div className="media-body">
                            <h6 className="mt-1">Enter Amount & Number</h6>
                        </div>
                    </div>
                    <div className="media mt-3 pl-2">
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Amount</label>
                                <input type="text" className="form-control" id="amount" placeholder="Enter Amount" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress2" className="form-label">Phone Number</label>
                                <input type="text" className="form-control" id="phone" placeholder="Enter Phone Number" />
                            </div>
                            <div className="col-12">
                                <button id="donate-button" type="button" className="btn btn-success" onClick={donate}>Donate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
