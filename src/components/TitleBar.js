import PropTypes from "prop-types";
import React from 'react';

const TitleBar = ({ 
    className,
    iconamoonSearch = "iconamoon-search-light.svg",
    divClassName,
    divClassNameOverride,
    logout }) => {
    return (
        <div
          className={`flex w-full items-center justify-between px-20 py-2 relative bg-[#a8c686] ${className}`}
        >
          <div className="inline-flex items-center gap-2 px-[42px] py-2 relative self-stretch flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] font-['Italiana',Helvetica] font-normal text-[#1b1212] text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
            VirtuWear
        </div>
        </div>
    
          <div className="flex flex-col items-start gap-2 px-14 py-0 relative flex-1 grow">
            <div className="flex h-12 items-center justify-center gap-2 px-5 py-4 relative self-stretch w-full bg-[#e5e9e2] rounded-[20px] border border-solid border-[#3b4c63]">
              <div className="inline-flex items-center gap-2 relative flex-[0_0_auto] mt-[-0.50px] mb-[-0.50px]">
                <img
                  className="relative w-4 h-4"
                  alt="Iconamoon search"
                  src={iconamoonSearch}
                />
    
                <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#252d8b] text-sm tracking-[0] leading-[normal]">
                    Search
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          <div className="inline-flex items-center justify-end gap-8 px-[42px] py-0 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
              <div
                className="text-white hover:bg-white hover:text-[#1C6033] transition duration-300 py-2 px-4 rounded-full text-xl hover:border-[#1C6033] flex items-center"
                style={{ fontFamily: "'Nunito_Sans-Regular',Helvetica" }}
              >
                Home
              </div>
            </div>
    
            <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
              <div
                className="text-white hover:bg-white hover:text-[#1C6033] transition duration-300 py-2 px-4 rounded-full text-xl hover:border-[#1C6033] flex items-center"
                style={{ fontFamily: "'Nunito_Sans-Regular',Helvetica" }}
              >
                Settings
              </div>
            </div>
            {/* Logout Button */}
            <button
                        type="button"
                        className="text-white hover:bg-white hover:text-[#1C6033] transition duration-300 py-2 px-4 rounded-full text-xl hover:border-[#1C6033] flex items-center"
                        onClick={logout}
                        style={{ fontFamily: "'Nunito_Sans-Regular',Helvetica" }}
                    >
                        Logout
            </button>
          </div>
        </div>
      );
    };

    
    TitleBar.propTypes = {
    iconamoonSearch: PropTypes.string,
  };

export default TitleBar;
