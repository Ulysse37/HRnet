export function makeData(numberOfRows) {
  // Code pour générer des données de test
  const data = [];
  for (let i = 0; i < numberOfRows; i++) {
    data.push({
      firstName: `Prénom ${i}`,
      lastName: `Nom ${i}`,
      startDate: '2021-03-1' + i,
      department: 'Filler text',
      dateOfBirth: 'Filler text',
      street: 'Filler text',
      city: 'Filler text',
      state:'Filler text',
      zipCode: 'Filler text'
    });
  }
  return data;
}
