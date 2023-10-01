let theinput = document.querySelector(".get-repos input");
let getbutton = document.querySelector(".get-button");
let reposdata = document.querySelector(".show-data");


getbutton.onclick= function(){
    getrepos();
};


function getrepos(){
    if(theinput.value=="")
    {
        reposdata.innerHTML="<span>please write github username</span>";
    }
    else
    {
        fetch(`https://api.github.com/users/${theinput.value}/repos`)
        .then((res)=>res.json())

        .then((repos)=>{
            reposdata.innerHTML='';

            repos.forEach(repo =>{
                let maindiv=document.createElement("div");
                let reponame=document.createTextNode(repo.name);
                maindiv.appendChild(reponame);

                let theurl=document.createElement('a');
                let theurltext=document.createTextNode("Visit");
                theurl.appendChild(theurltext);

                theurl.href=`https://github.com/${theinput.value}/${repo.name}`;
                theurl.setAttribute('target','_blank');

                maindiv.appendChild(theurl);
                
                let starsSpan=document.createElement("span");
                let starstext=document.createTextNode(`Stars ${repo.stargazers_count}`);

                starsSpan.appendChild(starstext);

                maindiv.appendChild(starsSpan);

                maindiv.className='repo-box';

                reposdata.appendChild(maindiv);
            });

        });
    }

}