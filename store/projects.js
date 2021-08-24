export const state = () => ({
    list: [
        {
            "id": 1,
            "acao": "GESAN – Grupo de Estudos em Segurança Alimentar e Nutricional Professor Pedro Kitoko",
            "meta_ods": "2.2",
            "descricao": "Desenvolver programas e projetos no campo da segurança alimentar e nutricional e do direito humano à alimentação.",
            "local": {
                "centro": "Centro de Ciências Exatas, Naturais e da Saúde – CCENS",
                "departamento": "Farmácia e Nutrição"
            },
            "coordenador": {
                "nome": "Alcemi Almeida de Barros",
                "vinculo": "Professor",
                "email": "fulandodetal@ufes.br"
            },
            "coord": [-20.76233, -41.53548]
        }
    ]
})

export const mutations = {
    add(state, project) {
        state.list.push(project)
    },
    remove(state, project) {
        state.list.splice(state.list.indexOf(project), 1)
    }
}