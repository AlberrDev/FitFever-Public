FROM python:3.10

WORKDIR /usr/src/app


RUN apt update && \
    apt install -y python3-dev default-libmysqlclient-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
COPY ./FitFever ./

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt  
    
EXPOSE 8000

ENTRYPOINT ["python3","manage.py","runserver","0.0.0.0:8000"]