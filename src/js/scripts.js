const medicosPorEspecialidade = {
    "clinico_geral": [
        { id: 1, nome: "Dra. Ana Silva", datas: ["2024-12-15", "2024-12-16", "2024-12-18"] },
        { id: 2, nome: "Dr. Carlos Santos", datas: ["2024-12-17", "2024-12-19", "2024-12-20"] }
    ],
    "dermatologia": [
        { id: 3, nome: "Dra. Beatriz Oliveira", datas: ["2024-12-15", "2024-12-22", "2024-12-23"] },
        { id: 4, nome: "Dr. Roberto Lima", datas: ["2024-12-16", "2024-12-24", "2024-12-25"] }
    ],
    "cardiologia": [
        { id: 5, nome: "Dr. Marcelo Costa", datas: ["2024-12-18", "2024-12-26", "2024-12-27"] },
        { id: 6, nome: "Dra. Fernanda Rocha", datas: ["2024-12-19", "2024-12-28", "2024-12-29"] }
    ],
    "pediatria": [
        { id: 7, nome: "Dra. Juliana Martins", datas: ["2024-12-20", "2024-12-30", "2024-12-31"] },
        { id: 8, nome: "Dr. Paulo Henrique", datas: ["2024-12-21", "2025-01-02", "2025-01-03"] }
    ],
    "ginecologia": [
        { id: 9, nome: "Dra. Patricia Almeida", datas: ["2024-12-22", "2025-01-04", "2025-01-05"] },
        { id: 10, nome: "Dra. Camila Rodrigues", datas: ["2024-12-23", "2025-01-06", "2025-01-07"] }
    ],
    "todas": [
        { id: 1, nome: "Dra. Ana Silva", especialidade: "Clínico Geral", datas: ["2024-12-15", "2024-12-16", "2024-12-18"] },
        { id: 2, nome: "Dr. Carlos Santos", especialidade: "Clínico Geral", datas: ["2024-12-17", "2024-12-19", "2024-12-20"] },
        { id: 3, nome: "Dra. Beatriz Oliveira", especialidade: "Dermatologia", datas: ["2024-12-15", "2024-12-22", "2024-12-23"] },
        { id: 4, nome: "Dr. Roberto Lima", especialidade: "Dermatologia", datas: ["2024-12-16", "2024-12-24", "2024-12-25"] },
        { id: 5, nome: "Dr. Marcelo Costa", especialidade: "Cardiologia", datas: ["2024-12-18", "2024-12-26", "2024-12-27"] },
        { id: 6, nome: "Dra. Fernanda Rocha", especialidade: "Cardiologia", datas: ["2024-12-19", "2024-12-28", "2024-12-29"] },
        { id: 7, nome: "Dra. Juliana Martins", especialidade: "Pediatria", datas: ["2024-12-20", "2024-12-30", "2024-12-31"] },
        { id: 8, nome: "Dr. Paulo Henrique", especialidade: "Pediatria", datas: ["2024-12-21", "2025-01-02", "2025-01-03"] },
        { id: 9, nome: "Dra. Patricia Almeida", especialidade: "Ginecologia", datas: ["2024-12-22", "2025-01-04", "2025-01-05"] },
        { id: 10, nome: "Dra. Camila Rodrigues", especialidade: "Ginecologia", datas: ["2024-12-23", "2025-01-06", "2025-01-07"] }
    ]
};

const selectArea = document.getElementById('select_area');
const selectDoctor = document.getElementById('select_doctor');
const selectDate = document.getElementById('select_date');
const appointmentForm = document.getElementById('appointment_form');


function formatarData(dataString) {
    const data = new Date(dataString + 'T00:00:00');
    return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).replace(/^\w/, c => c.toUpperCase());
}


selectArea.addEventListener('change', function() {
    const especialidade = this.value;
    
    
    selectDoctor.innerHTML = '<option value="" disabled selected>Selecione um especialista</option>';
    selectDate.innerHTML = '<option value="" disabled selected>Selecione uma data</option>';
    
    if (especialidade) {
        
        const medicos = medicosPorEspecialidade[especialidade];
        
        
        medicos.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico.id;
            
            if (especialidade === 'todas') {
                option.textContent = `${medico.nome} - ${medico.especialidade}`;
            } else {
                option.textContent = medico.nome;
            }
            
            option.setAttribute('data-datas', JSON.stringify(medico.datas));
            selectDoctor.appendChild(option);
        });
        
       
        selectDoctor.disabled = false;
    } else {
        selectDoctor.disabled = true;
        selectDate.disabled = true;
    }
});


selectDoctor.addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    
    
    selectDate.innerHTML = '<option value="" disabled selected>Selecione uma data</option>';
    
    if (selectedOption.value) {
       
        const datas = JSON.parse(selectedOption.getAttribute('data-datas'));
        
        
        datas.forEach(data => {
            const option = document.createElement('option');
            option.value = data;
            option.textContent = formatarData(data);
            selectDate.appendChild(option);
        });
        
       
        selectDate.disabled = false;
    } else {
        selectDate.disabled = true;
    }
});

appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const formData = {
        nome: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('tel').value,
        especialidade: selectArea.options[selectArea.selectedIndex].text,
        medico: selectDoctor.options[selectDoctor.selectedIndex].text,
        data: selectDate.options[selectDate.selectedIndex].text
    };
    
    
    if (!formData.nome || !formData.email || !formData.telefone || 
        !formData.especialidade || !formData.medico || !formData.data) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    
    console.log('Dados do agendamento:', formData);
    
  
    alert(`✅ Consulta agendada com sucesso!\n\n📋 Resumo:\n• Paciente: ${formData.nome}\n• Médico: ${formData.medico}\n• Especialidade: ${formData.especialidade}\n• Data: ${formData.data}\n\n📞 Entraremos em contato pelo WhatsApp para confirmação.`);
    

    appointmentForm.reset();
    selectDoctor.innerHTML = '<option value="" disabled selected>Selecione um especialista</option>';
    selectDate.innerHTML = '<option value="" disabled selected>Selecione uma data</option>';
    selectDoctor.disabled = true;
    selectDate.disabled = true;
});


selectDoctor.disabled = true;
selectDate.disabled = true;