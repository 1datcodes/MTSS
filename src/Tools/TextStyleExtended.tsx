import { Extension } from "@tiptap/react";
import { TextStyle } from "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> { 
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const TextStyleExtended = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace("px", ""),
        renderHTML: (attributes) => {
          if (!attributes["fontSize"]) {
            return {};
          }
          return {
            style: `font-size: ${attributes["fontSize"]}px`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:
        (fontSize) =>
        ({ commands }) => {
          return commands.setMark(this.name, { fontSize: fontSize });
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark(this.name, { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}px`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
        setFontSize: fontSize => ({ chain }) => {
            return chain()
                .setMark('textStyle', { fontSize: fontSize + "px" })
                .run();
        },
        unsetFontSize: () => ({ chain }) => {
            return chain()
                .setMark('textStyle', { fontSize: null })
                .removeEmptyTextStyle()
                .run();
        },
    };
  },
});

export default TextStyleExtended;