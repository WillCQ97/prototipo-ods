import projectsAlegre from "assets/projects_alegre.json";

export const state = () => ({
    list: projectsAlegre,
    index: projectsAlegre.lenght
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
