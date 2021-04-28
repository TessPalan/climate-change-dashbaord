# Import dependencies
from splinter import Browser
from bs4 import BeautifulSoup
import pandas as pd
import requests
import pymongo
import pathlib
from pytrends.request import TrendReq

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "chromedriver.exe"}
    return Browser("chrome", **executable_path, headless=True)

def scrape():
    browser = init_browser()

    # Find query trends for keywords "Sustainability", "Environment", "Climate Change", "Clean Energy"
    pytrend = TrendReq()
    pytrend.build_payload(kw_list = ["Sustainability", "Environment", "Climate Change", "Clean Energy"] )
    # Related Queries, returns a dictionary of dataframes
    related_queries = pytrend.related_queries()

    # Close the browser after scraping
    browser.quit()

    return related_queries

    
