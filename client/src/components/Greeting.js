import React from 'react';

const Greeting = () => {
    const userName = localStorage.getItem("name");
  const date = new Date();
  
  var hourFormat = date.getHours() === 0 ? 12 : date.getHours() % 12;
  var am_pm = date.getHours() < 12 ? "AM" : "PM";
  var minFormat = (date.getMinutes() % 60) < 10 ? "0" :"";
  var greeting =  date.getHours() >= 18 ? "Good evening, "
      : date.getHours() >= 12 ? "Good afternoon, "
    : "Good morning, ";
      
  return (
    <div>
      <h2>{` ${hourFormat}:${minFormat}${date.getMinutes() % 60}${am_pm} | ${greeting}`}
      {userName}!
      </h2>
    </div>
  )
}

export default Greeting;