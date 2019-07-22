let modal = document.getElementById('myModal');
let querySubmit = document.getElementById('btn');
let contact_no = document.getElementById('contact_no');
let email_id = document.getElementById('email');
let query = document.getElementById('myQuery');
window.onload = function(event) {
    contact_no.value="";
    email_id.value="";
    query.value="";

  }
querySubmit.addEventListener('click',function(event){
    event.preventDefault()
    console.log('hello');
    let datas = {
        contact : contact_no.value,
        email : email_id.value,
        queries : query.value
      }
    fetch('http://localhost:1804/queries',{
    method : 'POST',
    body: JSON.stringify(datas),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(data => data.json())
    .then(resp => {
      if(resp.inserted){
        console.log(resp)
        swal({
            title: "SUCCESS!",
            text: "Your query is saved!",
            icon: "success",
          });
      }
    })
});
let image1 = document.getElementById('box1');
let image2 = document.getElementById('box2');
let image3 = document.getElementById('box3');
let image4 = document.getElementById('box4');
let image5 = document.getElementById('box5');
let image6 = document.getElementById('box6');
// console.log(image1.childNodes[3].src);
// console.log(image2.childNodes[3].src);
fetch('http://localhost:1804/',
      ).then(res => res.json())
        .then(status =>{
        //   console.log(status[0].image_url);
          image1.childNodes[3].src = status[0].image_url;
          image2.childNodes[3].src = status[1].image_url;
          image3.childNodes[3].src = status[2].image_url;
          image4.childNodes[3].src = status[3].image_url;
          image5.childNodes[3].src = status[4].image_url;
          image6.childNodes[3].src = status[5].image_url;
        })
let discounturl = document.getElementById('discountImage');
// console.log(discounturl.src);
let discountPerc = document.getElementById('discountPercentage');
// console.log(discountPerc.innerHTML);
fetch('http://localhost:1804/deals',
      ).then(res => res.json())
        .then(resp =>{
          //console.log(resp);
          discounturl.src = resp[0].discountURL;
          discountPerc.innerHTML = resp[0].discountPerc;
        })
let header1 = document.getElementById("head1");
let header2 = document.getElementById("head2");
let headerPara1 = document.getElementById("head_para1");
let headerPara2 = document.getElementById("head_para2");
console.log(header1.innerText);
console.log(header2.innerText);
fetch('http://localhost:1804/latest',
      ).then(res => res.json())
        .then(resp =>{
            header1.innerText = resp[0].header;
            header2.innerText = resp[1].header;
            headerPara1.innerText = resp[0].header_info;
            headerPara2.innerText = resp[1].header_info;
        })
// function btnsub(event){
//     this.event.preventDefault();
//     console.log("hello");
// }