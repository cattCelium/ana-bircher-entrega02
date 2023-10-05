async function getLoadData(endpoint, selector, template) {
    try {
        const respuesta = await fetch(endpoint);
        if (!respuesta.ok) {
            throw new Error('No se pudo recuperar el perfil');
        }
        const data = await respuesta.json();
        const label = document.querySelector(selector)

        if (label) {
            label.innerHTML = template(data)
        }
    }
    catch (error) {
        console.log(error)
    }
};

function profileTemplate(data) {
    return `
    <section class="header__frameInfo">

            <div class="header__frameInfo__clippingMask">
                <img src="${data.avatar}" alt="foto de perfil" class="header__frameInfo__clippingMask__profileImg">
            </div>

            <div class="header__frameInfo__contact">
                <h1>${data.name}</h1>
                <h2>${data.profession}</h2>
            </div>
        

            <div class="header__frameInfo__contact">
                <img src="images/envelope.png" alt="icono de correo">
                <span class="header__contact__mail">${data.mail}</span> <br>
                <img src="images/phone.png" alt="icono de teléfono">
                <span>${data.phone}</span>
            </div>

            <p class="header__frameInfo__tx">${data.descrption}</p>

        </section>`
}

getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/profile`, `header`, profileTemplate);

function skillsTemplate(data) {
    let template =
        `<h3>Skills</h3>
        <div class="skills__progressFrame">
        <table>
    `;
    data.slice(0, 2).forEach((info) => {
        template +=
            `<tr>
              <td class="skills__progress__tx">${info.title}</td>
              <td><progress value="${info.progress}" min="0" max="100"></progress></td>
            </tr>
        `;
    });

    template +=
        `</table>
        <table>
    `;
    data.slice(2, 4).forEach((info) => {
        template +=
            `<tr>
                <td class="skills__progress__tx">${info.title}</td>
                <td><progress value="${info.progress}" min="0" max="100"></progress></progress></td>
            </tr>
        `
    });

    template += `
            </table>
            </div>
    `
    return template;
}

getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/skills`, `.skills`, skillsTemplate)

function experienceTemplate(data) {
    let template = `<h3>Experiencia</h3>
    <section class="experience__frameContainer">`;

    for (let i = 0; i < 1; i++) {
        template +=
            ` <article class="experience__frame">
        <section class="experience__leftFrame">
        <img src="${data[i].image}" alt="">
            <div class="experience__leftFrame__tx">
                <span class="experience__leftFrame__date">${data[i].date}</span>
                <span class="experience__leftFrame__job">${data[i].title}</span>
            </div>
        </section>
        <section class="experience__rightFrame">
            <p class="experience__rightFrame__tx">${data[i].descrption}</p>
        </section>
    </article>
    `
    }

    for (let i = 1; i < data.length; i++) {

        template +=
            ` <article class="experience__frame2">
        <section class="experience__leftFrame">
        <img src="${data[i].image}" alt="">
            <div class="experience__leftFrame__tx">
                <span class="experience__leftFrame__date">${data[i].date}</span>
                <span class="experience__leftFrame__job">${data[i].title}</span>
            </div>
        </section>
        <section class="experience__rightFrame">
            <p class="experience__rightFrame__tx">${data[i].descrption}</p>
        </section>
    </article>
    `
    };
    template += `</section>`

    return template
}

getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/experience`, `.experience`, experienceTemplate)

function certificationsTemplate(data) {
    let template = `<h3>Certificados</h3>
    <section class="certifications__container">`;

    for (let i = 0; i < 1; i++) {
        template += `
        <article class="certifications__container__frame">
            <section class="certifications__clippingMask">
                <img src="images/certification.png" alt="certificado curso diseño 3D con Blender" class="certifications__clippingMask__img">
            </section>

            <section class="certificatios__info">
                <span class="certificatios__info__job">Front-end Developer</span>
                <span class="certificatios__info__date">Feb 2022 - Actualidad</span>
            </section>
        </article>
        `
    }

    for (let i = 1; i < data.length; i++) {
        template += `
        <article class="certifications__container__frame2">
            <section class="certifications__clippingMask">
                <img src="images/certification.png" alt="certificado curso diseño 3D con Blender" class="certifications__clippingMask__img">
            </section>

            <section class="certificatios__info">
                <span class="certificatios__info__job">Front-end Developer</span>
                <span class="certificatios__info__date">Feb 2022 - Actualidad</span>
            </section>
        </article>
        `
    }
    template += `</section>`

    return template
}

getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/certifications`, `.certifications`, certificationsTemplate)

const btnSelection = document.getElementById("btnResponsive")
btnSelection.classList.add("showBtn")

function proyectPreviewTemplates(data) {
    let template = "";

    if (data.responsive && data.responsive.length > 0) {

        const proyectCount = document.querySelector(".proyectCountTitle")
        proyectCount.innerHTML = `Proyecto (${data.responsive.length})`

        data.responsive.forEach(info => {
            template += `
        <article class="preview">
        <div class="preview__frame"> 
            <div class="preview__frame__clippingMask">
                <img src="images/proyecto.png" alt="vista previa del proyecto" class="preview__frame__clippingMask__img">
            </div>
        </div>
        <section class="preview__frame__text">
            <div class="preview__frame__title">
                <span class="preview__frame__hashtags">#HTML #CSS #resposive</span>
                <h4>${info.title}</h4>
            </div>

            <p class="preview__frame__p">
                In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie. 
            </p>

            <nav class="preview__frame__nav">
                <a href="" class="preview__frame__nav__btn">Demo</a>
                <a href="" class="preview__frame__nav__btn">Code</a>
            </nav>
        </section>  
    </article>
        `
        });
    }
    return template
}
getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/proyectPreview`, `.main__preview`, proyectPreviewTemplates)

const buttons = document.querySelector(".proyects__nav")
buttons.addEventListener("click", (e) => {
    const buttonResponsive = document.querySelector("#btnResponsive");
    const buttonJavascript = document.querySelector("#btnJs");
    const buttonReact = document.querySelector("#btnReact");

    if (e.target === buttonResponsive) {
        function proyectPreviewTemplates(data) {
            let template = "";

            if (data.responsive && data.responsive.length > 0) {

                const proyectCount = document.querySelector(".proyectCountTitle")
                proyectCount.innerHTML = `Proyecto (${data.responsive.length})`

                buttonResponsive.classList.add("showBtn")
                buttonJavascript.classList.remove("showBtn")
                buttonReact.classList.remove("showBtn")

                data.responsive.forEach(info => {
                    template += `
            <article class="preview">
            <div class="preview__frame"> 
                <div class="preview__frame__clippingMask">
                    <img src="images/proyecto.png" alt="vista previa del proyecto" class="preview__frame__clippingMask__img">
                </div>
            </div>
            <section class="preview__frame__text">
                <div class="preview__frame__title">
                    <span class="preview__frame__hashtags">#HTML #CSS #resposive</span>
                    <h4>${info.title}</h4>
                </div>
    
                <p class="preview__frame__p">
                    In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie. 
                </p>
    
                <nav class="preview__frame__nav">
                    <a href="" class="preview__frame__nav__btn">Demo</a>
                    <a href="" class="preview__frame__nav__btn">Code</a>
                </nav>
            </section>  
        </article>
            `
                });
            }
            return template
        }
        getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/proyectPreview`, `.main__preview`, proyectPreviewTemplates)
    }

    if (e.target === buttonJavascript) {
        function proyectPreviewTemplates(data) {
            let template = "";

            if (data.javascript && data.javascript.length > 0) {

                const proyectCount = document.querySelector(".proyectCountTitle")
                proyectCount.innerHTML = `Proyecto (${data.javascript.length})`

                buttonResponsive.classList.remove("showBtn")
                buttonJavascript.classList.add("showBtn")
                buttonReact.classList.remove("showBtn")

                data.javascript.forEach(info => {
                    template += `
                    <article class="preview">
                    <div class="preview__frame"> 
                        <div class="preview__frame__clippingMask">
                            <img src="images/proyecto.png" alt="vista previa del proyecto" class="preview__frame__clippingMask__img">
                        </div>
                    </div>
                    <section class="preview__frame__text">
                        <div class="preview__frame__title">
                            <span class="preview__frame__hashtags">#HTML #CSS #resposive</span>
                            <h4>${info.title}</h4>
                        </div>
            
                        <p class="preview__frame__p">
                            In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie. 
                        </p>
            
                        <nav class="preview__frame__nav">
                            <a href="" class="preview__frame__nav__btn">Demo</a>
                            <a href="" class="preview__frame__nav__btn">Code</a>
                        </nav>
                    </section>  
                </article>
                    `
                });
            }
            return template
        }
        getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/proyectPreview`, `.main__preview`, proyectPreviewTemplates)
    }

    if (e.target === buttonReact) {
        function proyectPreviewTemplates(data) {
            let template = "";

            if (data.react && data.react.length > 0) {

                const proyectCount = document.querySelector(".proyectCountTitle")
                proyectCount.innerHTML = `Proyecto (${data.react.length})`

                buttonResponsive.classList.remove("showBtn")
                buttonJavascript.classList.remove("showBtn")
                buttonReact.classList.add("showBtn")

                data.react.forEach(info => {
                    template += `
            <article class="preview">
            <div class="preview__frame"> 
                <div class="preview__frame__clippingMask">
                    <img src="images/proyecto.png" alt="vista previa del proyecto" class="preview__frame__clippingMask__img">
                </div>
            </div>
            <section class="preview__frame__text">
                <div class="preview__frame__title">
                    <span class="preview__frame__hashtags">#HTML #CSS #resposive</span>
                    <h4>${info.title}</h4>
                </div>
    
                <p class="preview__frame__p">
                    In this project, I work with HTML and CSS to create a responsive page . The design is from devchallenge.io. Donec aliquam est dui, vel vestibulum diam sollicitudin id. Quisque feugiat malesuada molestie. 
                </p>
    
                <nav class="preview__frame__nav">
                    <a href="" class="preview__frame__nav__btn">Demo</a>
                    <a href="" class="preview__frame__nav__btn">Code</a>
                </nav>
            </section>  
        </article>
            `
                });
            }
            return template
        }
        getLoadData(`https://my-json-server.typicode.com/cattCelium/api-1/proyectPreview`, `.main__preview`, proyectPreviewTemplates)
    }
    console.log(proyectPreviewTemplates())
})

    ;



