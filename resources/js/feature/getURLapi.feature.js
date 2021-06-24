const getURLapi = () => {
    var parser = document.createElement("a");
    parser.href = window.location.href;
    const url = `${parser.protocol}//${parser.host}`;
    return url;
};

export default getURLapi;
