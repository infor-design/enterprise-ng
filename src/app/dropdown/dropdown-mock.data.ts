export const MOCK_STATES = [
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OR', label: 'Oregon' },
  { value: 'WA', label: 'Washington' },
  { value: 'WY', label: 'Wyoming' },
  { value: '<script>window.alert("dropdown xss")</script>XSS' , label: '<script>window.alert("dropdown xss")</script>XSS' },
  { value: '<script>window.alert(\'xss\'); debugger;</script>XSS' , label: '<script>window.alert("dropdown xss")debugger;</script>XSS' },
];
