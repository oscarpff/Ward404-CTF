// Central CTF configuration and helpers
(function(window){
  const CTF = {
    // Canonical flag identifiers (change here to update flags across the site)
    FLAGS: {
      OSINT_RECOVERED: 'OSINT_RECOVERED',
      ANIMA: 'ANIMA',
      SOCMINT_EVIDENCE: 'SOCMINT_EVIDENCE',
      PATIENT_COMPROMISED: 'PATIENT_COMPROMISED',
      NETWORK_ANOMALY: 'NETWORK_ANOMALY',
      DATA_EXFILTRATED: 'DATA_EXFILTRATED'
    },

    // Keys used to protect certain resources (change values to update keys)
    KEYS: {
      'osint:02': 'ANIMA_RECOVERED',
      'socmint:03': 'SOCMINT_EVIDENCE',
      'socmint:04': 'SOCMINT_EVIDENCE',
      'cti:06': 'NETWORK_ANOMALY'
    },

    // Combined flags required to open the conclusion (order not important)
    REQUIRED_COMBINED_FLAGS: ['ANIMA','PATIENT_COMPROMISED','DATA_EXFILTRATED'],

    // Helpers
    normalizeFlagContent: function(s){
      if(!s) return '';
      return String(s).trim().replace(/^FLAG\{|\}$/gi,'').trim();
    },

    // validate a simple key for a challenge id (accepts FLAG{...} or raw content)
    validateKeyFor: function(challengeId, userInput){
      const expected = this.KEYS[challengeId];
      if(!expected) return false;
      const expNorm = this.normalizeFlagContent(expected);
      const inNorm = this.normalizeFlagContent(userInput);
      return expNorm === inNorm;
    },

    // validate combined flags in form X+Y+Z or FLAG{X}+FLAG{Y}+FLAG{Z}
    validateCombinedFlags: function(str){
      if(!str) return false;
      const parts = String(str).split('+').map(p => this.normalizeFlagContent(p));
      if(parts.length !== this.REQUIRED_COMBINED_FLAGS.length) return false;
      return this.REQUIRED_COMBINED_FLAGS.every(f => parts.includes(f));
    }
  };

  // Expose globally
  window.CTF = CTF;
})(window);
