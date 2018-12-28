// MIT © 2018 azu
const waitForElement = require("wait-for-element");
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const insertCSS = () => {
    const css = `
.item-page-content {
    display: flex!important;
}

.rc-VideoItemTranscript {
    padding-right: 2rem!important;
    height: 100%!important;
    overflow: scroll!important;
}

.rc-ItemNavigation .item-scroll-container.with-secondary-navigation {
    margin-left: 0 !important;
    width: 100%!important;
}
.rc-CollapsibleLessonList {
}
.horizontal-box {
    background-color: #fff;
}
`;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
};
insertCSS();

async function applyPatch() {
    const _transcript = await waitForElement(".rc-VideoItemTranscript", 20 * 1000);
    const transcriptElement = document.querySelector(".rc-VideoItemTranscript");
    transcriptElement.dataset.gmMove = "true";
    const itemPageContentElement = document.querySelector(".item-page-content");
    itemPageContentElement.appendChild(transcriptElement);
}

(async function main() {
    await applyPatch();
    history.listen(async (location, action) => {
        const movedElement = document.querySelector(".rc-VideoItemTranscript[data-gm-move]");
        movedElement.parentNode.removeChild(movedElement);
        await applyPatch();
    });
})();
