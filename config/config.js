// import process from "eslint-config-next";

export const prefix =
    process.env.NODE_ENV === "production"
        ? "https://rissins.github.io/manna-front"
        : "";