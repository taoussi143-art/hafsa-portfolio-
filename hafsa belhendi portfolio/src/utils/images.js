const CLOUDINARY_BASE = "https://res.cloudinary.com/demo/image/upload";
const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/your-user/your-repo/main/images";

const cld = (transform, publicId = "sample.jpg") => `${CLOUDINARY_BASE}/${transform}/${publicId}`;
const gh = (file) => `${GITHUB_RAW_BASE}/${file}`;

const cloudinaryImages = {
  favicon: cld("w_64,h_64,c_fill,g_face,r_max,q_auto,f_auto"),
  logoWhite: cld("w_360,h_96,c_fill,b_rgb:ffffff,l_text:Arial_44_bold:HB%20Logo,co_rgb:A9446D,g_center"),
  logoDark: cld("w_360,h_96,c_fill,b_rgb:3B1F2B,l_text:Arial_44_bold:HB%20Logo,co_rgb:FFE6EC,g_center"),
  submark: cld("w_120,h_120,c_fill,r_max,l_text:Arial_46_bold:HB,co_rgb:3B1F2B,g_center"),
  iconHeart: cld("w_96,h_96,c_fill,r_max,b_rgb:F6B6C4,l_text:Arial_54:%E2%99%A5,co_rgb:A9446D,g_center"),
  iconService: cld("w_96,h_96,c_fill,r_max,b_rgb:FFE6EC,l_text:Arial_50:%E2%9C%A6,co_rgb:A9446D,g_center"),
  iconSparkle: cld("w_96,h_96,c_fill,r_max,b_rgb:FFE6EC,l_text:Arial_48:*,co_rgb:A9446D,g_center"),
  decoRose: cld("w_220,h_220,c_fill,b_rgb:F6B6C4,l_text:Arial_42:Rose,co_rgb:8E3D61,g_center"),
  decoLeaves: cld("w_220,h_220,c_fill,b_rgb:E5E0F8,l_text:Arial_38:Leaves,co_rgb:8E3D61,g_center"),
  decoSparkle: cld("w_220,h_220,c_fill,b_rgb:FFE6EC,l_text:Arial_36:Spark,co_rgb:8E3D61,g_center"),
  motto: cld("w_1200,h_220,c_fill,b_rgb:FFE6EC,l_text:Arial_40_bold:Dream%20Create%20Inspire%20Be%20Yourself,co_rgb:8E3D61,g_center"),
  avatar: cld("w_1200,h_1200,c_fill,g_face,q_auto,f_auto"),
  classicPortrait: cld("w_1000,h_1400,c_fill,g_face,q_auto,f_auto"),
  executivePortrait: cld("w_1000,h_1400,c_fill,g_auto,e_sharpen:80,q_auto,f_auto"),
  leftThreeQuarter: cld("w_1000,h_1400,c_fill,g_auto,e_improve,q_auto,f_auto"),
  rightThreeQuarter: cld("w_1000,h_1400,c_fill,g_auto,e_enhance,q_auto,f_auto"),
  leftProfile: cld("w_1000,h_1400,c_fill,g_auto,e_auto_color,q_auto,f_auto"),
  rightProfile: cld("w_1000,h_1400,c_fill,g_auto,e_auto_brightness,q_auto,f_auto"),
  highAngle: cld("w_1000,h_1400,c_fill,g_auto,e_auto_contrast,q_auto,f_auto"),
  closeup: cld("w_1000,h_1400,c_fill,g_face,e_sharpen:120,q_auto,f_auto")
};

const githubFallbackImages = {
  favicon: gh("favicon.png"),
  logoWhite: gh("logo-white.png"),
  logoDark: gh("logo-dark.png"),
  submark: gh("submark.png"),
  iconHeart: gh("icon-heart.png"),
  iconService: gh("icon-service.png"),
  iconSparkle: gh("icon-sparkle.png"),
  decoRose: gh("deco-rose.png"),
  decoLeaves: gh("deco-leaves.png"),
  decoSparkle: gh("deco-sparkle.png"),
  motto: gh("motto.png"),
  avatar: gh("avatar.png"),
  classicPortrait: gh("classic-portrait.png"),
  executivePortrait: gh("executive-portrait.png"),
  leftThreeQuarter: gh("left-three-quarter.png"),
  rightThreeQuarter: gh("right-three-quarter.png"),
  leftProfile: gh("left-profile.png"),
  rightProfile: gh("right-profile.png"),
  highAngle: gh("high-angle.png"),
  closeup: gh("closeup.jpg")
};

const useGithubFallback = false;
export const images = useGithubFallback ? githubFallbackImages : cloudinaryImages;

export const fallbackImage = cld("w_1000,h_1000,c_fill,b_rgb:F0DFE8,l_text:Arial_40:Image%20Unavailable,co_rgb:6A3C51,g_center");

export function applyHostedImages(root = document, map = images) {
  const setUrl = (el, url) => {
    if (!url) return;
    if (el.tagName === "LINK") {
      el.setAttribute("href", url);
      return;
    }
    if (el.tagName === "IMG") {
      el.setAttribute("src", url);
      if (!el.hasAttribute("loading")) el.setAttribute("loading", "lazy");
      el.setAttribute("decoding", "async");
      el.addEventListener("error", () => {
        if (el.getAttribute("src") !== fallbackImage) {
          el.setAttribute("src", fallbackImage);
        }
      }, { once: true });
      return;
    }
    el.style.backgroundImage = `url("${url}")`;
  };

  root.querySelectorAll("[data-image-key]").forEach((el) => {
    const key = el.getAttribute("data-image-key");
    setUrl(el, map[key]);
  });

  root.querySelectorAll("[data-bg-key]").forEach((el) => {
    const key = el.getAttribute("data-bg-key");
    setUrl(el, map[key]);
  });

  const cssVars = {
    "--img-deco-rose": map.decoRose,
    "--img-deco-leaves": map.decoLeaves,
    "--img-deco-sparkle": map.decoSparkle,
    "--img-icon-sparkle": map.iconSparkle
  };

  Object.entries(cssVars).forEach(([name, value]) => {
    if (value) {
      root.documentElement.style.setProperty(name, `url("${value}")`);
    }
  });
}
