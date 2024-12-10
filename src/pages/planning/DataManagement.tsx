import { useState } from 'react';
import { QuestionInput } from '../../components/planning/QuestionInput';
import { ProgressBar } from '../../components/planning/ProgressBar';
import { ActionButtons } from '../../components/planning/ActionButtons';
import { Link } from 'react-router-dom';
import React from 'react';

export function DataManagement() {
  const [answers, setAnswers] = useState({
    dataPlans: '',
    dataSufficiency: '',
    dataDeletion: '',
    dataEndOfLife: '',
    hosting: {
      cloud: false,
      local: false,
      notSure: false
    },
    cloudQuestion1: '',
    cloudQuestion2: '',
    cloudQuestion3: '',
    cloudQuestion4: '',
    cloudQuestion5: '',
    cloudQuestion6: '',
    cloudQuestion7: '',
    cloudQuestion8: '',
    localQuestion1: '',
    localQuestion2: '',
    localQuestion3: '',
    localQuestion4: '',
    localQuestion5: '',
    localQuestion6: '',
    localQuestion7: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (field: keyof typeof answers) => (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleHostingType = (type: keyof typeof answers.hosting) => {
    if (type === 'notSure') {
      setShowPopup(true);
      setAnswers(prev => ({
        ...prev,
        hosting: {
          ...prev.hosting,
          notSure: !prev.hosting.notSure,
          cloud: false,
          local: false
        }
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        hosting: {
          ...prev.hosting,
          [type]: !prev.hosting[type],
          notSure: false
        }
      }));
    }
  };

  // Calculate progress including nested questions
  const totalQuestions = 4 + 8 + 7; // 4 top-level + 8 cloud + 7 local

  const answeredQuestions = [
    answers.dataPlans,
    answers.dataSufficiency,
    answers.dataDeletion,
    answers.dataEndOfLife,
    ...Object.values(answers.hosting),
    answers.cloudQuestion1,
    answers.cloudQuestion2,
    answers.cloudQuestion3,
    answers.cloudQuestion4,
    answers.cloudQuestion5,
    answers.cloudQuestion6,
    answers.cloudQuestion7,
    answers.cloudQuestion8,
    answers.localQuestion1,
    answers.localQuestion2,
    answers.localQuestion3,
    answers.localQuestion4,
    answers.localQuestion5,
    answers.localQuestion6,
    answers.localQuestion7
  ].filter(Boolean).length;

  const progress = (answeredQuestions / totalQuestions) * 100;
  return (
    <div className="relative">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Collecting, storing, and/or processing data
        </h1>

        <ActionButtons />
      </div>

      <ProgressBar progress={progress} />

      <div className="bg-green-50 p-4 rounded-lg mb-8">
        <p className="text-green-800 flex items-center gap-2">
          Not doing software in house?
          <Link
            to="/planning/procurement"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            Go to procurement →
          </Link>
        </p>
      </div>
      <div className="space-y-8">
        <QuestionInput
          question="What data do you plan on collecting, storing and/or processing over the next decade, on an annual basis? Are you aware of any other planned or existing Digital Service that is collecting part or all of this data?"
          tooltip={`
            <div className="space-y-4">
              <p>
                Planning mitigates the risk of wasting compute resources by either over or underestimating the data that you will need:
              </p>

              <ul className="list-disc pl-6">
                <li>Overestimation will generate unnecessary data</li>
                <li>Underestimation increases the risk that the digital health system will not achieve its health outcomes</li>
              </ul>

              <p>
                If any of the data you plan to collect is already being collected, or will be collected via another planned digital health initiative, find out whether you could access it, rather than collecting it again from scratch.
              </p>

              <div>
                <p className="font-medium mb-2">Benefits of data sharing:</p>
                <ul className="list-disc pl-6">
                  <li>Avoids unnecessary energy expenditure in storing duplicate data</li>
                  <li>Prevents unnecessary effort and data collection fatigue</li>
                  <li>Reduces the likelihood of collecting the same data twice</li>
                </ul>
              </div>

              <div>
                <p className="font-medium mb-2">Important considerations:</p>
                <ul className="list-disc pl-6">
                  <li>Data providers may find the exercise burdensome</li>
                  <li>Data collectors may resort to outsourcing collection, potentially affecting quality</li>
                  <li>To ensure good quality data, provide tangible benefits for each local community involved</li>
                </ul>
              </div>
            </div>
          `}
          value={answers.dataPlans}
          onChange={handleChange('dataPlans')}
        />

        <QuestionInput
          question="How do you plan to ensure data sufficiency?"
          tooltip={`
            <div className="space-y-4">
              <p>
                Data sufficiency means only collecting and processing data sufficient for the outcome you need to achieve.
              </p>

              <div>
                <p className="font-medium mb-2">Examples of data 'beyond what is sufficient':</p>
                <ul className="list-disc pl-6">
                  <li>Collecting unnecessary demographic data (e.g. employment/marital status) when not needed</li>
                  <li>Images with unnecessarily high resolution</li>
                  <li>Monitoring data collected at an unnecessarily high frequency</li>
                  <li>Using high resolution videoconferencing when lower resolution or phone calls would suffice</li>
                </ul>
              </div>
            </div>
          `}
          value={answers.dataSufficiency}
          onChange={handleChange('dataSufficiency')}
        />

        <QuestionInput
          question="What systems do you have in place to delete data that is no longer needed, and to check and manage duplicate data?"
          tooltip={`
            <div className="space-y-4">
              <p>
                Addressing 'dark data' (data collected but never used) can significantly reduce energy consumption.
              </p>

              <p className="font-medium">Key techniques:</p>

              <div className="space-y-3">
                <div>
                  <p className="font-medium">1. Data Governance</p>
                  <ul className="list-disc pl-6">
                    <li>Identify relevant regulations for data retention</li>
                    <li>Establish processes for deleting unnecessary data</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium">2. Data Management</p>
                  <ul className="list-disc pl-6">
                    <li>Organize data into distinct categories</li>
                    <li>Ensure accurate and complete data views</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium">3. Data Sharing Strategy</p>
                  <ul className="list-disc pl-6">
                    <li>Implement to prevent data redundancy</li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium">4. Tiered Data Storage</p>
                  <ul className="list-disc pl-6">
                    <li>Store data based on access frequency</li>
                    <li>Use cold storage (lower energy cost) for archived data</li>
                  </ul>
                </div>
              </div>
            </div>
          `}
          value={answers.dataDeletion}
          onChange={handleChange('dataDeletion')}
        />

        <QuestionInput
          question="What happens to the data when the system is no longer in use?"
          tooltip={`
            <div className="space-y-2">
              <p className="font-medium">Important considerations for data end-of-life:</p>
              <ul className="list-disc pl-6">
                <li>Digital health systems may not last as long as originally anticipated</li>
                <li>Data is often left in place when systems become inactive</li>
                <li>Robust plans should be established from the start</li>
                <li>Clear processes needed for deleting redundant data when system becomes inactive</li>
              </ul>
            </div>
          `}
          value={answers.dataEndOfLife}
          onChange={handleChange('dataEndOfLife')}
        />

        <div>
          <div className="flex items-center">
            <h4>Will you use cloud or local server(s) or both to host data?</h4>
            <button
              onClick={() => setShowPopup(true)}
              className="ml-1 text-gray-400 hover:text-gray-600"
              aria-label="More information"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={answers.hosting.cloud}
                onChange={() => toggleHostingType('cloud')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Cloud</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={answers.hosting.local}
                onChange={() => toggleHostingType('local')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Local Server(s)</span>
            </label>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>

              <div className="prose">
                <p>
                  Have you compared a cloud option with the local server option from an environmental sustainability perspective? Cloud hosting is capable of achieving greater energy efficiency if it is correctly configured. However, be aware that other issues are being raised around cloud, particularly in relation to{' '}
                  <a
                    href="https://www.techtarget.com/whatis/definition/data-sovereignty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    data sovereignty
                  </a>,{' '}
                  <a
                    href="https://www.cloudflare.com/en-gb/learning/cloud/what-is-vendor-lock-in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    vendor lock ins
                  </a> and{' '}
                  <a
                    href="https://www.thegreenwebfoundation.org/news/the-politics-of-data-centers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    social justice
                  </a>.
                </p>

                <p>
                  Furthermore, while Cloud is usually more efficient for large scale processing, you will want to minimise the transfer of data between your Digital Health System end users and the cloud as this process requires energy and incurs carbon emissions. This means it may make sense to undertake{' '}
                  <a
                    href="thesaurus.html#edg_com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    "edge computing"
                  </a> on your local servers if they are nearer your end users.
                </p>

                <p>
                  If your Digital Health System will be hosted on a hybrid model – so making use of both local servers and cloud – investigate both of these options and consider how best to split the data and processing between them.
                </p>
              </div>
            </div>
          </div>
        )}

        {answers.hosting.cloud && (
          <div className="dropdown">
            <h4>Additional Questions for Cloud Hosting</h4>

            <QuestionInput
              question="How is the data centre powered? If it is mainly using renewables, is it using its own renewable energy, or is it powered from the grid?"
              value={answers.cloudQuestion1}
              onChange={handleChange('cloudQuestion1')}
              tooltip={`
                <div>
                  <p>Consider:</p>
                  <ul>
                    <li>Primary power source</li>
                    <li>Percentage of renewable energy used</li>
                    <li>Whether renewables are on-site or grid-sourced</li>
                    <li>Backup power systems and their environmental impact</li>
                  </ul>
                </div>
              `}
            />

            <QuestionInput
              question="If it is powered from the grid, where the proportion of the energy supplied that comes from renewable sources is always changing, does your hosting provider offer any options for temporal or spatial shifting?"
              tooltip={`
                <div>
                  <h4>Key concepts:</h4>

                  <h5>Temporal Shifting:</h5>
                  <ul>
                    <li>Maximizing data processing during high renewable energy periods</li>
                    <li>Scheduling non-critical tasks during optimal energy times</li>
                  </ul>

                  <h5>Spatial Shifting:</h5>
                  <ul>
                    <li>Running processes at different data center locations based on renewable energy availability</li>
                    <li>Balancing between primary and secondary locations</li>
                  </ul>

                  <h5>Considerations:</h5>
                  <ul>
                    <li>Critical vs non-critical processing needs</li>
                    <li>Flexibility in scheduling maintenance tasks</li>
                    <li>Impact on system performance and availability</li>
                  </ul>
                </div>
              `}
              value={answers.cloudQuestion2}
              onChange={handleChange('cloudQuestion2')}
            />

            <QuestionInput
              question="What types of cooling systems are being used and how much energy and water do they consume?"
              tooltip={ `<div>
                  <h4>Important factors to consider:</h4>

                  <h5>1. Energy Consumption:</h5>
                  <ul>
                    <li>Cooling system efficiency ratings</li>
                    <li>Power usage for different cooling methods</li>
                    <li>Impact on overall data center energy use</li>
                  </ul>

                  <h5>2. Water Usage:</h5>
                  <ul>
                    <li>Water recycling capabilities</li>
                    <li>Environmental impact of water usage</li>
                  </ul>

                  <h5> 3. System Types: </h5>
                  <ul>
                    <li>Air-based cooling</li>
                    <li>Liquid cooling</li>
                    <li>Hybrid systems</li>
                    <li>Free cooling options</li>
                  </ul>

                  <h5>4. Impact on Hardware:</h5>
                  <ul>
                    <li>Temperature management effectiveness</li>
                    <li>Hardware lifespan considerations</li>
                    <li>Thermal distribution</li>
                  </ul>
                </div>
              `}
              value={answers.cloudQuestion3}
              onChange={handleChange('cloudQuestion3')}
            />

            <QuestionInput
              question="Are the PUE, CUE, and WUE sustainability metrics available for the data centre? What are the values for these?"
              tooltip={`
                <div>
                  <h4>Key Metrics Explained:</h4>
                  <h5>PUE (Power Usage Effectiveness):</h5>
                  <ul>
                    <li>Ideal value: 1.0</li>
                    <li>Measures total facility power vs IT equipment power</li>
                    <li>Lower values indicate better efficiency</li>
                  </ul>

                  <h5>CUE (Carbon Usage Effectiveness):</h5>
                  <ul>
                    <li>Ideal value: 0</li>
                    <li>Measures total CO2 emissions from data center operations</li>
                    <li>Lower values indicate more carbon-neutral operations</li>
                  </ul>

                  <h5>WUE (Water Usage Effectiveness):</h5>
                  <ul>
                    <li>Ideal value: 0</li>
                    <li>Measures water usage for cooling and other purposes</li>
                    <li>Lower values indicate better water efficiency</li>
                  </ul>
                </div>
              `}
              value={answers.cloudQuestion4}
              onChange={handleChange('cloudQuestion4')}
            />

            <QuestionInput
              question="Is excess heat from the data centre recovered and reused, so it can displace fossil fuel heat sources?"
              value={answers.cloudQuestion5}
              onChange={handleChange('cloudQuestion5')}
              tooltip={`
                <div>
                  <p>Consider:</p>
                  <ul>
                    <li>Heat recovery systems in place</li>
                    <li>Applications for recovered heat</li>
                    <li>Energy savings from heat reuse</li>
                    <li>Impact on overall carbon footprint</li>
                  </ul>
                </div>
              `}
            />

            <QuestionInput
              question="What is the plan for the data centre to be sustainably decommissioned if/when it comes to its end of life?"
              tooltip={`
                <div>
                  <h4>Key Decommissioning Considerations:</h4>

                  <h5>1. Hardware Disposal:</h5>
                  <ul>
                    <li>Recycling programs</li>
                    <li>E-waste management</li>
                    <li>Component reuse opportunities</li>
                  </ul>

                  <h5>2. Environmental Impact:</h5>
                  <ul>
                    <li>Proper disposal of cooling systems</li>
                    <li>Management of hazardous materials</li>
                    <li>Site restoration plans</li>
                  </ul>

                  <h5>3. Data Security:</h5>
                  <ul>
                    <li>Secure data destruction</li>
                    <li>Hardware sanitization</li>
                    <li>Compliance with regulations</li>
                  </ul>
                </div>
              `}
              value={answers.cloudQuestion6}
              onChange={handleChange('cloudQuestion6')}
            />

            <QuestionInput
              question="Would your digital health system be hosted in a verified green data centre?"
              tooltip={`
                <div>
                  <h4>Green Data Centre Verification:</h4>
                  <ul>
                    <li>Check The Green Web Foundation's verified list</li>
                    <li>Look for environmental certifications</li>
                    <li>Review sustainability commitments</li>
                    <li>Assess renewable energy usage</li>
                    <li>Evaluate efficiency metrics</li>
                  </ul>
                </div>
              `}
              value={answers.cloudQuestion7}
              onChange={handleChange('cloudQuestion7')}
            />

            <QuestionInput
              question="What resource pooling options are offered by your hosting provider?"
              tooltip={`
                <div>
                  <h4>Resource Pooling Benefits:</h4>

                  <h5>1. Energy Efficiency:</h5>
                  <ul>
                    <li>Shared resource utilization</li>
                    <li>Optimized workload distribution</li>
                    <li>Reduced idle capacity</li>
                  </ul>

                  <h5>2. Cost Benefits:</h5>
                  <ul>
                    <li>Economies of scale</li>
                    <li>Shared infrastructure costs</li>
                    <li>Flexible resource allocation</li>
                  </ul>

                  <h5>3. Environmental Impact:</h5>
                  <ul>
                    <li>Reduced overall energy consumption</li>
                    <li>Better resource utilization</li>
                    <li>Lower carbon footprint per user</li>
                  </ul>
                </div>
              `}
              value={answers.cloudQuestion8}
              onChange={handleChange('cloudQuestion8')}
            />
          </div>
        )}

        {answers.hosting.local && (
          <div className="dropdown">
            <h4>Additional Questions for Local Server Hosting</h4>

            <QuestionInput
              question="How is your server room powered?"
              tooltip={`
                <div>
                  <p>Consider:</p>
                  <ul>
                    <li>Current energy supplier's renewable mix and carbon intensity</li>
                    <li>Availability of renewable energy tariffs</li>
                    <li>Supplier's sustainability commitments and roadmap</li>
                    <li>Options for renewable energy providers</li>
                    <li>On-site renewable energy possibilities</li>
                    <li>Energy efficiency measures</li>
                  </ul>
                </div>
              `}
              value={answers.localQuestion1}
              onChange={handleChange('localQuestion1')}
            />

            <QuestionInput
              question="Are you under pressure to upgrade your reserve energy system (Uninterruptible Power Supply or UPS) to a more energy efficient model?"
              tooltip={`
                <div>
                  <h4>Key Considerations:</h4>

                  <h5>1. Current System:</h5>
                  <ul>
                    <li>Age and efficiency</li>
                    <li>Maintenance status</li>
                    <li>Actual performance</li>
                  </ul>

                  <h5>2. Upgrade Impact:</h5>
                  <ul>
                    <li>Embodied carbon in new equipment</li>
                    <li>Energy efficiency gains</li>
                    <li>Cost-benefit analysis</li>
                  </ul>

                  <h5>3. Timing:</h5>
                  <ul>
                    <li>Wait until current system reaches end of life</li>
                    <li>Plan for future upgrades</li>
                    <li>Consider interim efficiency improvements</li>
                  </ul>
                </div>
              `}
              value={answers.localQuestion2}
              onChange={handleChange('localQuestion2')}
            />

            <QuestionInput
              question="If you have a generator to back up your UPS, what fuel does it use?"
              tooltip={`
                <div>
                  <h4>Fuel Options Comparison:</h4>

                  <h5>Better Environmental Options:</h5>
                  <ul>
                    <li>Bio fuels</li>
                    <li>Natural gas</li>
                    <li>Hydrogenated Vegetable Oil (HVO)</li>
                  </ul>

                  <h5>Considerations:</h5>
                  <ul>
                    <li>Transport emissions for fuel delivery</li>
                    <li>Storage requirements</li>
                    <li>Environmental impact</li>
                    <li>Maintenance needs</li>
                    <li>Cost effectiveness</li>
                  </ul>
                </div>
              `}
              value={answers.localQuestion3}
              onChange={handleChange('localQuestion3')}
            />

            <QuestionInput
              question="What are the environmental impacts of your server room air conditioning system?"
              tooltip={`
                <div>
                  <h4>Key Considerations:</h4>

                  <h5>1. Temperature Management:</h5>
                  <ul>
                    <li>Monitor room temperature</li>
                    <li>Avoid overcooling</li>
                    <li>Optimize temperature settings</li>
                  </ul>

                  <h5>2. AC System Efficiency:</h5>
                  <ul>
                    <li>Current system performance</li>
                    <li>Energy usage monitoring</li>
                    <li>Maintenance schedule</li>
                  </ul>

                  <h5>3. Coolant Considerations:</h5>
                  <ul>
                    <li>Global Warming Potential (GWP) of current coolant</li>
                    <li>Options for lower GWP alternatives</li>
                    <li>HFC replacement planning</li>
                  </ul>

                  <h5>4. System Replacement:</h5>
                  <ul>
                    <li>Consider total carbon footprint</li>
                    <li>Evaluate actual efficiency needs</li>
                    <li>Plan for end-of-life replacement</li>
                  </ul>
                </div>
              `}
              value={answers.localQuestion4}
              onChange={handleChange('localQuestion4')}
            />

            <QuestionInput
              question="Are the servers/ server racks in your server room arranged to maximise front to rear air flow?"
              tooltip={`
                <div>
                  <h4>Optimization Strategies:</h4>

                  <h5>1. Server Rack Arrangement:</h5>
                  <ul>
                    <li>Front to rear airflow optimization</li>
                    <li>Hot/cold aisle configuration</li>
                    <li>Proper spacing between racks</li>
                  </ul>

                  <h5>2. Cooling Efficiency:</h5>
                  <ul>
                    <li>'In row' cooling placement</li>
                    <li>Proximity to server cabinets</li>
                    <li>Air flow management</li>
                    <li>Temperature monitoring</li>
                  </ul>
                </div>
              `}
              value={answers.localQuestion5}
              onChange={handleChange('localQuestion5')}
            />

            <QuestionInput
              question="Can you recover the servers' waste heat for re-use? For example, using the generated heat to warm the building?"
              tooltip={`
                <div>
                  <h4>Heat Recovery Options:</h4>

                  <h5>1. Building Heating:</h5>
                  <ul>
                    <li>Space heating</li>
                    <li>Water heating</li>
                    <li>Climate control</li>
                  </ul>

                  <h5>2. Benefits:</h5>
                  <ul>
                    <li>Reduced energy waste</li>
                    <li>Lower heating costs</li>
                    <li>Improved efficiency</li>
                    <li>Reduced carbon footprint</li>
                  </ul>
                </div>
              `}
              value={answers.localQuestion6}
              onChange={handleChange('localQuestion6')}
            />

            <QuestionInput
              question="Do you make environmental impact metrics readily available for your server room?"
              tooltip={`
                <div className="space-y-4">
                  <h4 className="font-semibold">Key Metrics:</h4>

                  <div className="space-y-2">
                    <h5 className="font-medium">PUE (Power Usage Effectiveness):</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Ideal value: 1.0</li>
                      <li>Measures total facility power vs IT equipment power</li>
                      <li>Includes cooling and lighting energy use</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium">CUE (Carbon Usage Effectiveness):</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Ideal value: 0</li>
                      <li>Measures carbon emissions</li>
                      <li>Indicates renewable energy usage</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium">Additional Considerations:</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Regular monitoring and reporting</li>
                      <li>Transparency in metrics</li>
                      <li>Continuous improvement goals</li>
                    </ul>
                  </div>
                </div>
              `}
              value={answers.localQuestion7}
              onChange={handleChange('localQuestion7')}
            />
          </div>
        )}
      </div>
    </div>
  );
}