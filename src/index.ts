window.styla.registerCustomModule('NAME', async (wrapper, content) => {

    console.log('wrapper', wrapper);
    console.log('content', content);

    const linkOpener = (event) => {
        const serviceName = event.currentTarget.getAttribute("data-service-name");
        const url = escape(document.location.href);
        const title = escape(document.title);
        const description = document.querySelector("meta[name='description']") && escape(document.querySelector("meta[name='description']").getAttribute("content"));
        let destinationLink = "";

        if (serviceName === "facebook") {
            destinationLink = "https://facebook.com/share.php?u=" + url;
        }

        if (serviceName === "pinterest") {
            destinationLink = "https://pinterest.com/pin/create/button/?url=" + url + "&amp;description=" + title;
        }

        if (serviceName === "twitter") {
            destinationLink = "https://twitter.com/share?url=" + url + "&amp;text=" + title;
        }

        if (serviceName === "linkedin") {
            destinationLink = "http://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title;
        }

        if (serviceName === "whatsapp") {
            destinationLink = "https://api.whatsapp.com/send?text=" + url;
        }

        window.open(destinationLink, "_blank");
    }

    const links = wrapper.querySelectorAll("div a");

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", linkOpener);
    }

});
