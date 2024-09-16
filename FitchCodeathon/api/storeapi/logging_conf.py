import logging
from logging.config import dictConfig

from storeapi.config import DevConfig, config

handlers = ["default", "rotating_file"]
# only use the cloud logging platform, Logtail, if operating in prod mode
if config.ENV_STATE == "prod":
    handlers = ["default", "rotating_file"]


def obfuscated(email: str, obfuscated_length: int) -> str:
    """Obfuscate email address for logging purposes."""
    # ljd@hotmail.com - lj*@hotmai.com - obfuscated length = 2
    characters = email[:obfuscated_length]
    first, last = email.split("@")
    return characters + ("*" * (len(first) - obfuscated_length)) + "@" + last


# Define a custom logging filter to obfuscate email addresses from being put into the log file
class EmailObfuscationFilter(logging.Filter):
    # class constructor, class inherits from the logging.Filter class
    def __init__(self, name: str = "", obfuscated_length: int = 2) -> None:
        # pass the logger's name to the constructor of the super class
        super().__init__(name)
        self.obfuscated_length = obfuscated_length

    # This is a boolean function that will cause the log record to be filtered out if it returns False
    def filter(self, record: logging.LogRecord) -> bool:
        # check if the log record has an email property and that it has a value
        if "email" in record.__dict__ and record.__dict__["email"] is not None:
            record.email = obfuscated(record.email, self.obfuscated_length)
        return True


def configure_logging() -> None:
    """
    Logging configuration for application
    """
    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "filters": {
                # the correlation_id is used to tag all logs that originate from the same request and is useful in
                # an environment with lots of parallel requests
                "correlation_id": {
                    # the empty parenthesis key denotes a constructor call
                    # so a call to asgi_correlation_id.CorrelationIdFilter(kwargs) constructor
                    "()": "asgi_correlation_id.CorrelationIdFilter",
                    # any key and values added after this line are passed as kwargs to the filter constructor above
                    "uuid_length": 8 if isinstance(config, DevConfig) else 32,
                    "default_value": "-",
                },
                "email_obfuscation": {
                    "()": EmailObfuscationFilter,
                    # don't need to pass the filter's name to the constructor as that's pass automatically
                    # in all environments other than dev obfuscate fully
                    "obfuscated_length": 2 if isinstance(config, DevConfig) else 0,
                },
            },
            "formatters": {
                "console": {
                    "class": "logging.Formatter",
                    "datefmt": "%Y-%m-%dT%H:%M:%S",
                    # use the correlation_id as generated by the Filter above to enrich the log message
                    "format": " [%(correlation_id)s] %(name)s:%(lineno)d - %(message)s",
                },
                "file": {
                    "class": "pythonjsonlogger.jsonlogger.JsonFormatter",
                    "datefmt": "%Y-%m-%dT%H:%M:%S",
                    # For JsonFormatter, the format string just defines what keys are included in the log record
                    # It's a bit clunky, but it's the way to do it for now
                    "format": "%(asctime)s %(msecs)03d %(levelname)s %(correlation_id)s %(name)s %(lineno)d %(message)s",
                },
            },
            "handlers": {
                "default": {
                    "class": "rich.logging.RichHandler",  # "logging.StreamHandler",
                    "level": "DEBUG",
                    "formatter": "console",
                    "filters": ["correlation_id", "email_obfuscation"],
                },
                "rotating_file": {
                    "class": "logging.handlers.RotatingFileHandler",
                    "level": "DEBUG",
                    "filename": "storeapi.log",
                    "maxBytes": 1024 * 1024,  # 1 MB
                    "backupCount": 2,
                    "formatter": "file",
                    "filters": ["correlation_id", "email_obfuscation"],
                },
            },
            "loggers": {
                "uvicorn": {  # this is the default logger for uvicorn
                    "handlers": ["default", "rotating_file"],
                    "level": "INFO",
                },
                "storeapi": {
                    "handlers": handlers,
                    "level": "DEBUG" if isinstance(config, DevConfig) else "INFO",
                    "propagate": False,
                },
                "databases": {
                    # default logger for databases
                    "handlers": ["default"],
                    "level": "WARNING",
                },
                "aiosqlite": {
                    # default logger for sqlite
                    "handlers": ["default"],
                    "level": "WARNING",
                },
            },
        }
    )
