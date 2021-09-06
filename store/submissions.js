import submissionsAlegre from "assets/submissions_alegre.json";

export const state = () => ({
    list: submissionsAlegre,
    index: submissionsAlegre.length
})

export const mutations = {
    add(state, project) {
        state.list.push(project);
        state.index++;
    },
    remove(state, project) {
        state.list.splice(state.list.indexOf(project), 1);
    }
}
