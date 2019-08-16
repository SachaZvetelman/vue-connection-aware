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
            el.style.display = 'none';
        }
    }
}

// const defaults = {
//     mediumSpeed: 1,
//     fastSpeed: 3
// } 