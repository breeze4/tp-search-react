export const getVizThumbUrl = (defaultViewRepoUrl) => {
    let sheetParts = defaultViewRepoUrl.split('/sheets/');
    let thumbPath = sheetParts[0].substr(0, 2) + '/' + sheetParts[0] + '/' + sheetParts[1];
    thumbPath = `https://public.tableau.com/static/images/${thumbPath}/`;
    return `${thumbPath}4_3.png`;
}