/*
* @Author: Just be free
* @Date:   2020-11-04 15:11:21
* @Last Modified by:   Just be free
* @Last Modified time: 2021-06-07 16:32:32
* @E-mail: justbefree@126.com
*/
import Queen, { Options, mixins, prop } from "../component/Queen";
import { h } from "vue";

class Props {
  margin?: string
  rows = prop<string|number>({
    default: 2,
    validator: (num: string|number): boolean => {
      return parseInt(String(num)) >= 2 && parseInt(String(num)) <= 20;
    }
  })
  avatar = prop<boolean>({ default: true })
}
const paddingHeight = 10;
const barHeight = 16;
const avatarSize = 80;
@Options({
  name: "QSkeleton",
  mixins: []
})
export default class QSkeleton extends mixins(Queen).with(Props) {
  public static componentName = "QSkeleton";
  render() {
    const avatarClass = this.avatar ? "avatar" : "";
    const rows = parseInt(String(this.rows));
    const boxHeight = (rows + 1) * barHeight + rows * paddingHeight;
    return h(
      "div",
      { class: ["q-skeleton"], style: { margin: this.margin } },
      {
        default: () => [
          h(
            "div",
            {
              class: ["animated-background"],
              style: { height: `${boxHeight}px` },
            },
            {
              default: () => [
                h(
                  "div",
                  { class: ["background-masker", "header-left", avatarClass] },
                  { default: () => [] }
                ),
                h("div", { class: ["background-masker", "header-right"] }, { default: () => [] }),
                ...Array.apply(null, new Array(rows)).map((row: any, index: number, arr: any[]) => {
                  return h(
                    "div",
                    {
                      class: [
                        "background-masker",
                        avatarClass,
                        `header-bottom-${index + 1}`,
                      ],
                    },
                    { default: () => [] }
                  );
                }),
                h(
                  "div",
                  {
                    class: ["background-masker", "subheader-left", avatarClass],
                    style: { height: `${boxHeight - avatarSize}px` },
                  },
                  { default: () => [] }
                ),
                h("div", { class: ["background-masker", "subheader-right"] }, { default: () => [] }),
              ]
            }
          ),
        ]
      }
    );
  }
}
