import submissionsAlegre from "assets/submissions_alegre.json";

export const state = () => ({
    list: submissionsAlegre,
})

export const mutations = {
    add(state, project) {
        state.list.push(project);
    },
    remove(state, project) {
        state.list.splice(state.list.indexOf(project), 1);
    }
}
