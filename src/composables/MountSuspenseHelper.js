import { defineComponent, h, Suspense } from "vue";
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";

const mountSuspense = async (component, options) => {
  const wrapper = mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component),
          fallback: h("div", "fallback")
        });
      }
    }),
    options
  );
  await flushPromises();
  return wrapper;
};

export { mountSuspense };
