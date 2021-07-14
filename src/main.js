const $siteList=$(".siteList")
const $lastLi=$siteList.find("li.last")
const x=localStorage.getItem("x")
const xObject=JSON.parse(x)
const hashMap= xObject|| [
   {logo:"D",url:"https://www.douyu.com/"},
   {logo:"H",url:"https://www.huya.com/"},
    {logo:"T",url:"https://v.qq.com/"},
    {logo:"Y",url:"https://www.youku.com/"},
    {logo:"M",url:"https://www.mgtv.com/"}
]

const simplifyUrl=(url)=>{
    return url.replace("https://","").replace("http://","").replace("www.",""). replace(/\/.*/, '') //删除/开头的内容
}



const render=()=> {
    $siteList.find("li:not(.last)").remove() //唯独不找最后一个.last
    hashMap.forEach((node,index)=> {
       const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">                 
                   <svg class="icon">
                      <use xlink:href="#icon-close"></use>
                   </svg>
              </div>
            </div>
</li>`).insertBefore($lastLi)
       $li.on("click",()=>{
       window.open(node.url)
   })
       $li.on("click",".close",(e)=>{
       e.stopPropagation()
       hashMap.splice(index,1)
       render()
   })
   })

}


render()
$(".addButton").on("click",()=>{
    let url =window.prompt('请问你的添加网址是啥')
    if(url.indexOf('http')!==0){
       url='https://'+url
   }
    hashMap.push(
       {
          logo:simplifyUrl(url)[0].toUpperCase(),
          url:url
       }
   )
   render()
})
 window.onbeforeunload=()=>{
     const string=JSON.stringify(hashMap)
     localStorage.setItem("x",string)
 }
 $(document).on("keypress",(e)=>{
     const {key}=e
     for(let i=0;i<hashMap.length;i++){
         if(hashMap[i].logo.toLowerCase()===key){
             window.open(hashMap[i].url)
         }
     }
 })
