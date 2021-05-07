 document.addEventListener('DOMContentLoaded', () => {

            const pincode = document.querySelector('#pincode');
            const registerbtn = document.querySelector('#register');
            let special = document.querySelector('#special');
            let n = document.querySelector('#number');
            let lu = document.querySelector('#upperlower');
            let chars2 = document.querySelector('#chars');
            registerbtn.disabled = true;
            pincode.onkeyup = () => {
                checkpincode(pincode.value);
            }
            checkpincode(pincode.value);
            const password = document.querySelector('#password');
            password.onkeyup = () => {
                checkpassword(password.value);
            }
            const confirmpass = document.querySelector('#confirm-pass');
            confirmpass.onfocus = () => {
                confirmpass.onkeyup = () => {
                    var input = document.querySelector('#confirmpassmess');
                    if (password.value === confirmpass.value) {
                        input.innerHTML = "Passwords Match!";
                        input.style.color = 'green';
                        if(chars2.style.color === 'green' && lu.style.color === 'green' && n.style.color === 'green' && special.style.color === 'green')
                        {
                            registerbtn.disabled = false;
                        }
                    } else {
                        input.innerHTML = "Passwords do not Match!";
                        input.style.color = 'red';
                        registerbtn.disabled = true;
                    }
                }
            }
            document.querySelector('#confirmpassmess').innerHTML = "";
        })

        function checkpincode(pincode)
        {
            console.log('hello');
            fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            .then(response => response.json())
            .then(data => {
                console.log("api call made!");
                console.log(data[0].Status);
                var message = document.querySelector('#pincode-message');
                console.log(message);
                if(data[0].Status === 'Error' || data[0].Status === "404")
                {
                    console.log('error');
                    let district = document.querySelector('#district');
                    district.value = "";
                    message.innerHTML = 'Invalid Pincode';
                    message.style.color = 'red';
                }
                else
                {
                    console.log('success!');
                    let district = document.querySelector('#district');
                    district.value = data[0].PostOffice[0].District;
                    message.innerHTML = 'Pincode found!';
                    message.style.color = 'green';
                }
            })
        }

        function checkpassword(password) {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            var chars = new RegExp("^(?=.{8,})");
            var lowerandupper = new RegExp("^(?=.*[a-z])(?=.*[A-Z])");
            var numbers = new RegExp("^(?=.*[0-9])");
            var spl = new RegExp("^(?=.*[!@#\$%\^&\*])");
            let special = document.querySelector('#special');
            let n = document.querySelector('#number');
            let lu = document.querySelector('#upperlower');
            let chars2 = document.querySelector('#chars');
            let allgreen = false;
            if (chars.test(password))
                chars2.style.color = 'green';
            else
                chars2.style.color = 'red';
            if (lowerandupper.test(password))
                lu.style.color = 'green';

            else
                lu.style.color = 'red';
            if(numbers.test(password))
                n.style.color = 'green';
            else
                n.style.color = 'red';
            if(spl.test(password))
                special.style.color = 'green';
            else
                special.style.color = 'red';
            if(chars2.style.color === 'green' && lu.style.color === 'green' && n.style.color === 'green' && special.style.color === 'green')
                allgreen = true;
            else
                allgreen = false;
            if(allgreen)
                document.querySelector('#register').disabled = false;
            else
                document.querySelector('#register').disabled = true;
        }