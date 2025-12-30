//import * as monaco from "@/node_modules/monaco-editor/esm/vs/editor/editor.main.js";
//import { initVimMode } from "monaco-vim";



export const TAG_NAME ="my-" + (import.meta.url.replace(/^[a-z]+:\/\/[^/]+\/|\/[^/]*$/gi, "").replace(/\//g, "-") || "origin")
 
export class CustomElem extends HTMLElement {
  static get observedAttributes() {
    return ["mode"]; // "vim" or "normal"
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        #container {
          width: 100%;
          height: 300px;
          border: 1px solid #ccc;
        }
        #status {
          font-size: 12px;
          padding: 4px;
          background: #eee;
        }
      </style>
      <div id="container"></div>
      <div id="status"></div>
    `;

    this.editor = null;
    this.vim = null;
  }

  connectedCallback() {
    this.initEditor();
  }

  disconnectedCallback() {
    if (this.vim) this.vim.dispose();
    if (this.editor) this.editor.dispose();
  }

  initEditor() {
    const container = this.shadowRoot.querySelector("#container");

    this.editor = monaco.editor.create(container, {
      value: "// Hello Monaco + Vim\nfunction test() {\n  console.log('hello');\n}",
      language: "javascript",
      theme: "vs-dark",
    });

    // 初期モードを反映
    this.updateMode();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "mode" && this.editor) {
      this.updateMode();
    }
  }

  updateMode() {
    const status = this.shadowRoot.querySelector("#status");

    // Vim → Normal に戻す
    if (this.vim) {
      this.vim.dispose();
      this.vim = null;
    }

    if (this.getAttribute("mode") === "vim") {
      this.vim = initVimMode(this.editor, status);
      status.textContent = "Vim mode";
    } else {
      status.textContent = "Normal mode";
    }
  }
}

customElements.define("editor-component", EditorComponent);
customElements.whenDefined(TAG_NAME).then(()=>console.log("!!! defined !!!",TAG_NAME))
