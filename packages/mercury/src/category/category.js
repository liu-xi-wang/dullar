/*
 * @Author: Just be free
 * @Date:   2021-07-19 15:14:51
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-07-21 14:27:32
 * @E-mail: justbefree@126.com
 */
import { defineComponent } from "../modules/component";
// genComponentName
export default defineComponent({
  name: "Category",
  props: {
    categories: Array,
  },
  data() {
    return {
      currentCategory: -1,
    };
  },
  methods: {
    handleMouseEnter(index) {
      this.currentCategory = index;
    },
    handleMouseLeave() {
      this.currentCategory = -1;
    },
  },
  render(h) {
    return h("div", { class: ["yn-category"] }, [
      h(
        "ul",
        { class: ["yn-category-ul"] },
        Array.apply(null, this.categories).map((cate, index) => {
          return h(
            "li",
            {
              class: ["yn-category-li"],
              on: {
                mouseenter: this.handleMouseEnter.bind(this, index),
                mouseleave: this.handleMouseLeave.bind(this, index),
              },
            },
            [
              h("div", { class: ["label"] }, [h("span", {}, cate.label)]),
              h(
                "div",
                {
                  class: [
                    "result-panel",
                    this.currentCategory === index ? "" : "hide",
                  ],
                },
                Array.apply(null, cate.sub).map((sub) => {
                  return h("dl", { class: [] }, [
                    h("dt", {}, sub.label),
                    h(
                      "dd",
                      {},
                      Array.apply(null, sub.list).map((list) => {
                        return h("span", {}, list);
                      })
                    ),
                  ]);
                })
              ),
            ]
          );
        })
      ),
    ]);
  },
});