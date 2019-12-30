import createLogo from "./createLogo";
import createAccountBar from "./createAccountBar";
import createNavItems from "./createNavItems";
import initEvent from "./initEvent";
import util from "../util";
export default function createNav(config) {
  // 判断当前是否存在公用顶部栏，有则移除
  const hasNav = util.getDom("#COMMON-TOP-NAV");
  hasNav && hasNav.remove();
  const nav = document.createElement("div");
  nav.setAttribute("class", "nav");
  nav.setAttribute("id", "COMMON-TOP-NAV");
  let wrap = '<div class="nav-wrap">';
  wrap += createLogo(config);
  wrap += createNavItems(config);
  wrap += createAccountBar(config);
  wrap += "</div>";
  nav.innerHTML = wrap;
  document.body.appendChild(nav);
  if (config.paddingTop) {
    document.body.style.paddingTop = "70px";
  }
  //添加事件处理
  initEvent(config);
}
