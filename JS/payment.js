
        const API_URL = 'http://localhost:3000';
        let currentPaymentMethod = 'card';

        // Payment method selection
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

        // Card number formatting
        document.getElementById('cardNumber').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });

        // Expiry date formatting
        document.getElementById('expiry').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });

        // CVV validation
        document.getElementById('cvv').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        // Form submission
        document.getElementById('paymentForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const loading = document.getElementById('loading');
            const successMsg = document.getElementById('successMessage');
            const errorMsg = document.getElementById('errorMessage');
            const submitBtn = e.target.querySelector('.btn');

            // Hide messages
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';
            
            // Show loading
            loading.style.display = 'block';
            submitBtn.disabled = true;

            // Prepare order data - matches your database structure
            const orderData = {
                prescriptionId: 1, // You can pass this via URL params
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
                    
                    // Redirect after 2 seconds
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

        // Load prescription data from URL params if available
        window.addEventListener('DOMContentLoaded', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const prescriptionId = urlParams.get('prescriptionId');
            
            if (prescriptionId) {
                // In a real app, you would fetch prescription details from the backend
                console.log('Loading prescription:', prescriptionId);
            }
        });