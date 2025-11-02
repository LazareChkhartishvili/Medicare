import Toast from 'react-native-toast-message';

export const showToast = {
  success: (message: string, title?: string) => {
    Toast.show({
      type: 'success',
      text1: title || 'წარმატება',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  error: (message: string, title?: string) => {
    Toast.show({
      type: 'error',
      text1: title || 'შეცდომა',
      text2: message,
      position: 'top',
      visibilityTime: 4000,
    });
  },

  info: (message: string, title?: string) => {
    Toast.show({
      type: 'info',
      text1: title || 'ინფორმაცია',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  warning: (message: string, title?: string) => {
    Toast.show({
      type: 'info', // react-native-toast-message doesn't have warning type
      text1: title || 'გაფრთხილება',
      text2: message,
      position: 'top',
      visibilityTime: 3500,
    });
  },

  // Auth specific toasts
  auth: {
    loginSuccess: (userName: string) => {
      showToast.success(`გამარჯობა, ${userName}!`, 'წარმატებით შეხვედით');
    },
    
    loginError: (error: string) => {
      let message = 'შეცდომა შესვლისას';
      
      if (error.includes('Invalid credentials')) {
        message = 'არასწორი ელ-ფოსტა ან პაროლი';
      } else if (error.includes('User not found')) {
        message = 'მომხმარებელი არ მოიძებნა';
      } else if (error.includes('Invalid email')) {
        message = 'არასწორი ელ-ფოსტის ფორმატი';
      }
      
      showToast.error(message, 'შესვლის შეცდომა');
    },
    
    registerSuccess: (userName: string) => {
      showToast.success(`კეთილი იყოს თქვენი მობრძანება, ${userName}!`, 'რეგისტრაცია წარმატებული');
    },
    
    registerError: (error: string) => {
      let message = 'შეცდომა რეგისტრაციისას';
      
      if (error.includes('already exists')) {
        message = 'ამ ელ-ფოსტით უკვე არსებობს ანგარიში';
      } else if (error.includes('Invalid email')) {
        message = 'არასწორი ელ-ფოსტის ფორმატი';
      } else if (error.includes('Password')) {
        message = 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო';
      }
      
      showToast.error(message, 'რეგისტრაციის შეცდომა');
    },
    
    logoutSuccess: () => {
      showToast.info('წარმატებით გამოხვედით', 'გასვლა');
    },
    
    logoutError: () => {
      showToast.error('შეცდომა გასვლისას', 'გასვლის შეცდომა');
    }
  },

  // API specific toasts
  api: {
    networkError: () => {
      showToast.error('ინტერნეტ კავშირი არ არის', 'ქსელის შეცდომა');
    },
    
    serverError: () => {
      showToast.error('სერვერის შეცდომა', 'სერვერის პრობლემა');
    },
    
    timeout: () => {
      showToast.error('მოთხოვნის დრო ამოიწურა', 'დროის შეცდომა');
    }
  }
};
