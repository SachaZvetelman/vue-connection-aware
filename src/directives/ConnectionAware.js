/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
export default {
    bind (el, binding, vnode) {
        if(!navigator) {
            return;
        }

        const { downlink, rrt, effectiveType } = navigator.connection;

        const minimumConnectionSpeed = binding.value.minimumConnectionSpeed;
    
        if(downlink < minimumConnectionSpeed)
        {
            // TODO: find a way to prevent the node rendering.
        }
    },
    inserted (el, binding, vnode) {
        console.log('inserted');
    },
    update (el, binding, vnode) {
        console.log('update');
    },
    componentUpdated (el, binding, vnode) {
        console.log('componentUpdated');
    },
    unbind (el, binding, vnode) {
        console.log('unbind');
    },
}