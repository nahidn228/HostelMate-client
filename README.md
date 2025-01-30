# HostelMate

HostelMate is a MERN stack-based Hostel Management System designed for universities to streamline hostel operations. The app allows students to log in, view meals, post reviews, and request meals, while administrators can manage meal data, user accounts, reviews, and upcoming meals.  

## Live Site  
🔗 **[HostelMate Live Site](https://hostelmate01.web.app/)**  

## Admin Access  
- **Admin Email:** admin@admin.com  
- **Admin Password:** As123456789@

## Features  
1. **User Authentication:**  
   - Login/registration using email/password and social login.  
   - JWT-based persistent login with Axios interceptors for secure API requests.

2. **Dynamic Meal Management:**  
   - View meals categorized as Breakfast, Lunch, Dinner, and All Meals.  
   - Search and filter meals by category, price, or keyword with server-side implementation.
    

3. **Meal Detail Page:**  
   - Displays meal details, including image, distributor, rating, reviews, and request options.  
   - Like, Review and request meals (requires login).  

4. **Review Management:**  
   - Students can post their reviews on meals.  
   - Admins can manage all reviews, including deleting inappropriate ones.  

5. **Membership Packages:**  
   - Premium packages (Silver, Gold, Platinum) with Stripe payment integration.  
   - Badges assigned based on purchased packages.  

6. **Upcoming Meals:**  
   - Upcoming meal section with likes feature for premium users.  
   - Publish meals with a minimum of 10 likes to the main meals collection.  

7. **Responsive Dashboards:**  
   - User Dashboard: Profile, requested meals, reviews, and payment history.  
   - Admin Dashboard: Manage users, meals, reviews, and upcoming meals.  

8. **Admin Controls:**  
   - Add, update, delete, and sort meals.  
   - Assign admin roles to users.  
   - Serve requested meals and manage their statuses.  

9. **Notifications:**  
   - SweetAlert2 and React Hot Toast for all CRUD operations and authentication events.  

10. **Fully Responsive Design:**  
   - Optimized for mobile, tablet, and desktop views, including all dashboard pages.  

## Technologies Used  

### Frontend  
- **Frameworks & Libraries:** React, React Router Dom, React Query (Tanstack)  
- **Form Management:** React Hook Form with @hookform/resolvers and Yup validation  
- **UI/UX:** TailwindCSS, DaisyUI, Animate.css, Framer Motion, Swiper  
- **State & Data Management:**  Axios  
- **Payment Integration:** Stripe  
- **Notifications:** React Hot Toast, SweetAlert2  
- **Utilities:** React Icons, React DatePicker  

### Backend  
- **Server Framework:** Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JSON Web Tokens (JWT)  
- **Payment:** Stripe API  
- **Environment Management:** dotenv  
- **CORS Support:** Enabled with the CORS package  

 
