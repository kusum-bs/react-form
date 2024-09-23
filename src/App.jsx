import { useState, useEffect } from "react";
import "src/App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import FormInput from "./Components/FormInput.jsx";
import Payment from "./Components/Payment.jsx";

function App() {
  const [values, setValues] = useState({
    firstname: "",                                                                    
    middlename: "",
    lastname: "",
    email: "",
    altemail: "",
    mobile: "",
    altmobile: "",
    dob: "",
    income: "",
    occupants: "",
    details: "",
    budget: "",
    configuration: "",
    availconfig: "",
    unitprice: "",
    aftertax: "",
    total: "",
    amount: "",
    payment: "",
    projectname: "", // Added projectname to track project selection
  });

  const [occupants, setOccupants] = useState([]);
  const [occupantError, setOccupantError] = useState(""); // For showing error message
  const [validOccupants, setValidOccupants] = useState(true); // To track if occupants input is valid

  // Dropdown Options
  const projects = [
    "Sobha Properties",
    "Embassy Properties",
    "Shri Ram Properties",
    "Housing Board Apartments",
    "Godrej Properties",
    "Prestige Estate",
    "Oberoi Reality",
    "TATA Housing",
  ];
  const paymentmode = [
   "Debit Card",
   "Credit Card",
   "Master Card",
   "Netbanking",
   "UPI",
  ];

   // Initialize navigation function



  const budgets = [
    { label: "<10 Lakhs", value: "<10" },
    { label: "10-30 Lakhs", value: "10-30" },
    { label: "30-50 Lakhs", value: "30-50" },
    { label: "50-70 Lakhs", value: "50-70" },
    { label: ">70 Lakhs", value: ">70" },
  ];

  const configurations = {
    "<10": ["1 BHK"],
    "10-30": ["1 BHK", "2 BHK"],
    "30-50": ["1 BHK", "2 BHK", "3 BHK"],
    "50-70": ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
    ">70": ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Duplex"],
  };

  const inputs = [
    { id: 1, name: "firstname", type: "text", placeholder: "Enter your First Name", errorMessage: "Firstname should be 3-18 characters and should not include any special characters!", label: "First name", pattern: "^[A-Za-z0-9]{3,18}$" , required: true, },
    { id: 2, name: "middlename", type: "text", placeholder: "Enter your Middle Name", errorMessage: "", label: "Middle name" },
    { id: 3, name: "lastname", type: "text", placeholder: "Enter your Last Name", errorMessage: "Lastname should not include any special characters!", label: "Last name" , pattern: "^[A-Za-z0-9]{1,18}$", required: true,},
    { id: 4, name: "email", type: "email", placeholder: "Enter your email", errorMessage: "It should be a valid email address!", label: "Email" , required: true,},
    { id: 5, name: "altemail", type: "email", placeholder: "Enter your alt email", errorMessage: "It should be a valid email address!", label: "Altemail" , required: true,},
    { id: 6, name: "mobile", type: "phone", placeholder: "Enter your Mobile number", errorMessage: "It should be a valid phone number!", label: "Mobile No" , required: true,},
    { id: 7, name: "altmobile", type: "phone", placeholder: "Enter your alternate Mobile Number", errorMessage: "It should be a valid phone number!", label: "Alt Mobile" , required: true,},
    { id: 8, name: "dob", type: "date", placeholder: "Enter in DD-MM-YYYY Format", label: "DOB" },
  { id: 9, name: "income", type: "text", placeholder: "Enter your Annual Salary", errorMessage: "Please enter your salary in euros (€).", label: "Income" , required: true, pattern:"^(\€)\s?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*|[0-9]+)(\.[0-9]{2})?$",},
    { id: 10, name: "occupants", type: "number", placeholder: "Number of Occupants", errorMessage: "Please enter number of occupants, it is mandatory", label: "Occupants", required: true, },
    { id: 11, name: "projectname", type: "select", placeholder: "Select Project", errorMessage: "Please select the Project, it is mandatory", label: "Project Name", required: true,},
    { id: 12, name: "budget", type: "select", placeholder: "Enter your Budget", errorMessage: "Please enter your budget, it is mandatory", label: "Budget" , required: true,},
    { id: 13, name: "configuration", type: "select", placeholder: "Enter your Config", errorMessage: "", label: "Configurations" , required: true,},
    { id: 14, name: "unitprice", type: "none", placeholder: "" , label: "Unit Price" },
    { id: 15, name: "aftertax", type: "number", placeholder: "", label: "After Tax" },
    { id: 16, name: "total", type: "number", placeholder: "", label: "Total" },
    { id: 17, name: "amount", type: "number", placeholder: "", label: "Amount" },
    { id: 18, name: "payment", type: "select", placeholder: "Choose Payment Method", label: "Payment" , required: true,},
  ];
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log(occupants); // Display occupant data
    navigate("/payment", { state: { paymentMethod: values.payment } }) // Redirect to Paymentjsx
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === "occupants") {
      validateOccupants(e.target.value);
    }
  };
  useEffect(() => {
    // Auto-populate values for unit price, after tax, total, and amount based on budget and configuration
    const calculateValues = () => {
      const { budget, configuration } = values;
      let unitPrice = 0;

      if (budget === "<10" && configuration === "1 BHK") {
        unitPrice = 1000000;
      } else if (budget === "10-30") {
        if (configuration === "1 BHK") unitPrice = 1500000;
        else if (configuration === "2 BHK") unitPrice = 2500000;
      } else if (budget === "30-50") {
        if (configuration === "1 BHK") unitPrice = 3500000;
        else if (configuration === "2 BHK") unitPrice = 4500000;
        else if (configuration === "3 BHK") unitPrice = 5500000;
      } else if (budget === "50-70") {
        if (configuration === "1 BHK") unitPrice = 5000000;
        else if (configuration === "2 BHK") unitPrice = 6000000;
        else if (configuration === "3 BHK") unitPrice = 7000000;
        else if (configuration === "4 BHK") unitPrice = 8000000;
      } else if (budget === ">70") {
        if (configuration === "1 BHK") unitPrice = 8500000;
        else if (configuration === "2 BHK") unitPrice = 9900000;
        else if (configuration === "3 BHK") unitPrice = 10000000;
        else if (configuration === "4 BHK") unitPrice = 12000000;
        else if (configuration === "Duplex") unitPrice = 14000000;
      }

      // Calculate after tax (assuming 10% tax for simplicity)
      const afterTax = unitPrice + (unitPrice * 0.18);
      //const total = unitPrice + afterTax;

      setValues((prevValues) => ({
        ...prevValues,
        unitprice: unitPrice,
        aftertax: afterTax,
        total: afterTax,
        amount: afterTax, // Assuming amount is the same as total for now
      }));
    };

    // Trigger calculation only when both budget and configuration are selected
    if (values.budget && values.configuration) {
      calculateValues();
    }
  }, [values.budget, values.configuration]);

  const validateOccupants = (value) => {
    const numberOfOccupants = parseInt(value) || 0;
    if (numberOfOccupants > 10) {
      setValidOccupants(false);
      setOccupantError("You can only enter up to 10 occupants.");
    } else if (occupants.length > numberOfOccupants) {
      setValidOccupants(false);
      setOccupantError(`You can only enter up to ${numberOfOccupants} occupant(s).`);
    } else {
      setValidOccupants(true);
      setOccupantError("");
    }
  };

  const handleAddOccupant = () => {
    const numberOfOccupants = parseInt(values.occupants) || 0;
    if (numberOfOccupants > 10) {
      setOccupantError("You can only enter up to 10 occupants.");
    } else if (occupants.length < numberOfOccupants) {
      setOccupants([...occupants, { name: "", age: "", relation: "" }]);
      setValidOccupants(true); // Reset error if adding more is allowed
      setOccupantError(""); // Clear any previous error
    } else {
      setOccupantError(`You can only enter up to ${numberOfOccupants} occupant(s).`);
    }
  };

  const handleOccupantChange = (index, e) => {
    const newOccupants = occupants.map((occupant, i) => {
      if (i === index) {
        return { ...occupant, [e.target.name]: e.target.value };
      }
      return occupant;
    });
    setOccupants(newOccupants);
  };

  // New helper functions for dropdown logic
  const getAvailableBudgets = () => {
    const premiumProjects = ["Oberoi Reality", "Sobha Properties", "Embassy Properties"];
    if (premiumProjects.includes(values.projectname)) {
      // Remove "<10 Lakhs" and "10-30 Lakhs"
      return budgets.filter((budget) => budget.value !== "<10" && budget.value !== "10-30");
    }
    return budgets;
  };

  const getAvailableConfigurations = () => {
    return configurations[values.budget] || [];
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
    <div className="app">
      <h1 className="form-title">Expression Of Interest Form</h1> <br />
      <form onSubmit={handleSubmit}>
        {inputs.slice(0, 10).map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            className={input.name === "occupants" && !validOccupants ? "error-input" : ""}
          /> 
        ))}
        

        {/* Occupant Section after the Details field */}
        <div className="occupant-header">
          <h3>Occupant Details</h3>
          <button type="button" onClick={handleAddOccupant} className="add-button">
            + Add Occupant
          </button>
        </div>
        
        {/* Error message for exceeding the limit */}
        {occupantError && <p className="error-message">{occupantError}</p>}

        {occupants.map((occupant, index) => (
          <div className="occupant-section" key={index}>
            <div className="formInput">
              <label>Name: </label>
              <input
                type="text"
                name="name"
                placeholder="Occupant Name"
                value={occupant.name}
                onChange={(e) => handleOccupantChange(index, e)}
              />
            </div>
            <div className="formInput">
              <label>Age: </label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={occupant.age}
                onChange={(e) => handleOccupantChange(index, e)}
              />
            </div>
            <div className="formInput">
              <label>Relation: </label>
              <input
                type="text"
                name="relation"
                placeholder="Relation"
                value={occupant.relation}
                onChange={(e) => handleOccupantChange(index, e)}
              />
            </div>
          </div>
        ))}

        {/* Added Project Name Dropdown */}
        <div className="formInput">
          <label>Project Name: </label>
          <select name="projectname" value={values.projectname} onChange={onChange}>
            <option value="">Select Project</option>
            {projects.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        {/* Added Budget Dropdown */}
        <div className="formInput">
          <label>Budget: </label>
          <select name="budget" value={values.budget} onChange={onChange}>
            <option value="">Select Budget</option>
            {getAvailableBudgets().map((budget, index) => (
              <option key={index} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>
        </div>

        {/* Added Configurations Dropdown */}
        <div className="formInput">
          <label>Configuration: </label>
          <select name="configuration" value={values.configuration} onChange={onChange}>
            <option value="">Select Configuration</option>
            {getAvailableConfigurations().map((config, index) => (
              <option key={index} value={config}>
                {config}
              </option>
            ))}
          </select>
        </div>
        {inputs.slice(13, 17).map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}

        <div className="formInput">
          <label>Choose Payment Method</label>
          <select name="payment" value={values.payment} onChange={(e) => setValues({ ...values, payment: e.target.value })}>
            <option value="">Select Payment Method</option>
            {paymentmode.map((payment, index) => (
              <option key={index} value={payment}>
                {payment}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Proceed to Pay</button>
       
      </form>
    </div>
        }/>
         <Route path="/payment" element={<Payment />} /> {/* Route for Payment component */}
         </Routes>
  );
  
}

export default App;
