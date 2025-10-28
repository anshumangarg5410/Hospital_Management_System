
        import API_URL from '../backend/databases/server_data'
        let currentPaymentMethod = 'card';


        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
                this.classList.add('active');
                currentPaymentMethod = this.dataset.method;

                // Hide all payment forms
                document.getElementById('cardPayment').style.display = 'none';
                document.getElementById('upiPayment').style.display = 'none';
                document.getElementById('netbankingPayment').style.display = 'none';

                // Show selected payment form
                if (currentPaymentMethod === 'card') {
                    document.getElementById('cardPayment').style.display = 'block';
                } else if (currentPaymentMethod === 'upi') {
                    document.getElementById('upiPayment').style.display = 'block';
                } else if (currentPaymentMethod === 'netbanking') {
                    document.getElementById('netbankingPayment').style.display = 'block';
                }
            });
        });


        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });


        document.getElementById('expiry').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });


        document.getElementById('cvv').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });


        document.getElementById('paymentForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const loading = document.getElementById('loading');
            const successMsg = document.getElementById('successMessage');
            const errorMsg = document.getElementById('errorMessage');
            const submitBtn = e.target.querySelector('.btn');


            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';
            

            loading.style.display = 'block';
            submitBtn.disabled = true;


            const orderData = {
                prescriptionId: 1,
                prescriptionName: document.getElementById('prescriptionName').textContent,
                doctorName: document.getElementById('doctorName').textContent,
                medicines: [
                    { name: 'Paracetamol', instructions: 'As directed by physician', price: 120 },
                    { name: 'Vitamin D', instructions: 'As directed by physician', price: 250 }
                ],
                total: 438.50,
                subtotal: 370,
                deliveryCharges: 50,
                tax: 18.50,
                paymentMethod: currentPaymentMethod,
                deliveryAddress: document.getElementById('deliveryAddress').value,
                status: 'Processing'
            };

            try {
                const response = await fetch(`${API_URL}/createOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                const result = await response.json();

                loading.style.display = 'none';

                if (result.success) {
                    successMsg.style.display = 'block';
                    e.target.reset();
                    

                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 2000);
                } else {
                    errorMsg.textContent = '❌ ' + (result.message || 'Payment failed. Please try again.');
                    errorMsg.style.display = 'block';
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Payment error:', error);
                loading.style.display = 'none';
                errorMsg.textContent = '❌ Network error. Please check your connection and try again.';
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
            }
        });


        window.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const prescriptionId = urlParams.get('prescriptionId');
            
            if (prescriptionId) {
                console.log('Loading prescription:', prescriptionId);
            }
        });