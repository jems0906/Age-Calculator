// Initialize the datepicker
flatpickr("#birthdate", {
  dateFormat: "d/m/Y",
  maxDate: "today",
});

// Use Luxon for date calculations
const { DateTime } = luxon;

document.getElementById('ageForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const input = document.getElementById('birthdate').value;
  if (!input) {
    document.getElementById('result').textContent = "Please enter a valid date.";
    return;
  }

  const [day, month, year] = input.split('/');
  const birthDate = DateTime.fromObject({ day: +day, month: +month, year: +year });
  const now = DateTime.now();

  if (!birthDate.isValid || birthDate > now) {
    document.getElementById('result').textContent = "Please enter a valid birth date.";
    return;
  }

  let years = now.year - birthDate.year;
  let months = now.month - birthDate.month;
  let days = now.day - birthDate.day;

  if (days < 0) {
    months -= 1;
    days += birthDate.minus({ months: 1 }).daysInMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  document.getElementById('result').textContent =
    `You are ${years} years ${months} months old.`;
});
